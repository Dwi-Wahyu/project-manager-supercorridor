"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, ListTodo, Loader, Plus, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { IconTrash, IconX } from "@tabler/icons-react";
import { deleteTaskStatus, upsertTaskStatus } from "./actions";
import { toast } from "sonner";
import { getTaskStatus } from "./queries";
import {
  UpsertTaskStatusSchema,
  UpsertTaskStatusSchemaType,
} from "@/validations/schemas/task";
import { ConfirmationDialog } from "@/components/confirmation-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export function TaskStatusCard({
  allTaskStatus,
}: {
  allTaskStatus: Awaited<ReturnType<typeof getTaskStatus>>;
}) {
  const [showInput, setShowInput] = useState(false);

  const form = useForm<UpsertTaskStatusSchemaType>({
    resolver: zodResolver(UpsertTaskStatusSchema),
    defaultValues: {
      id: "",
      label: "",
    },
  });

  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);

  const onSubmit = async (payload: UpsertTaskStatusSchemaType) => {
    const result = await upsertTaskStatus(payload);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      setShowInput(false);
    } else {
      toast.error(result.error.message);
    }
  };

  function handleClickEdit(id: string, label: string) {
    form.setValue("id", id);
    form.setValue("label", label);
    setShowInput(true);
  }

  function handleToggleInput() {
    form.reset();
    setShowInput((prev) => !prev);
  }

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleClickDelete(id: string) {
    setSelectedStatusId(id);
    setIsConfirmDialogOpen(true);
  }

  async function handleDelete() {
    if (!selectedStatusId) return;

    setIsDeleting(true);

    const result = await deleteTaskStatus(selectedStatusId);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error.message);
    }

    setIsDeleting(false);
    setIsConfirmDialogOpen(false);
  }

  return (
    <Card>
      <CardContent>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <ListTodo className="w-4 h-4" />
              <CardTitle>Status Task</CardTitle>
            </div>

            <Button variant={"ghost"} onClick={handleToggleInput} size={"icon"}>
              {showInput ? <IconX /> : <Plus />}
            </Button>
          </div>

          {showInput && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex mt-2 gap-2 items-center w-full"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Done, Stuck, On Progress"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>
                  {form.formState.isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Save />
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 gap-4">
          {allTaskStatus.map((taskStatus, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 px-3 border rounded"
            >
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant={"outline"}>{taskStatus.tasks.length}</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{taskStatus.tasks.length} Task</p>
                  </TooltipContent>
                </Tooltip>

                <h1>{taskStatus.label}</h1>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() =>
                    handleClickEdit(taskStatus.id, taskStatus.label)
                  }
                  className="hover:scale-105 cursor-pointer transition-all ease-in-out duration-100"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleClickDelete(taskStatus.id)}
                  className="hover:scale-105 cursor-pointer transition-all ease-in-out duration-100"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setSelectedStatusId(null);
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={handleDelete}
        title="Konfirmasi Penghapusan"
        message={`Apakah Anda yakin ingin menghapus status ? Tindakan ini akan mempengaruhi task yang menggunakan status ini.`}
        confirmButtonText={isDeleting ? "Menghapus..." : "Hapus"}
        cancelButtonText="Batal"
        isLoading={isDeleting}
      />
    </Card>
  );
}
