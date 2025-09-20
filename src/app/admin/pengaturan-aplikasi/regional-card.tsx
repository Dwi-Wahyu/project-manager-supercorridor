"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Globe, Loader, Plus, Save } from "lucide-react";
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
import {
  UpsertRegionalSchema,
  UpsertRegionalSchemaType,
} from "@/validations/schemas/regional";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { IconTrash, IconX } from "@tabler/icons-react";
import { deleteRegional, upsertRegional } from "./actions";
import { toast } from "sonner";
import { getRegionals } from "./queries";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RegionalCard({
  regionals,
}: {
  regionals: Awaited<ReturnType<typeof getRegionals>>;
}) {
  const [showInput, setShowInput] = useState(false);

  const form = useForm<UpsertRegionalSchemaType>({
    resolver: zodResolver(UpsertRegionalSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const [selectedStatusId, setSelectedRegionalId] = useState<string | null>(
    null
  );

  const onSubmit = async (payload: UpsertRegionalSchemaType) => {
    const result = await upsertRegional(payload);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      setShowInput(false);
    } else {
      toast.error(result.error.message);
    }
  };

  function handleClickEdit(id: string, name: string) {
    form.setValue("id", id);
    form.setValue("name", name);
    setShowInput(true);
  }

  function handleToggleInput() {
    form.reset();
    setShowInput((prev) => !prev);
  }

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleClickDelete(id: string) {
    setSelectedRegionalId(id);
    setIsConfirmDialogOpen(true);
  }

  async function handleDelete() {
    if (!selectedStatusId) return;

    setIsDeleting(true);

    const regional = regionals.find(
      (regional) => regional.id === selectedStatusId
    );

    if (!regional) {
      toast.error("Regional tidak ditemukan");
      return;
    }

    if (regional.projects.length > 0) {
      toast.error("Terdapat project yang masih menggunakan regional");
      return;
    }

    const result = await deleteRegional(selectedStatusId);

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
              <Globe className="w-4 h-4" />
              <CardTitle>Regional</CardTitle>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="JAKARTA, BANTEN, SEMARANG"
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
          {regionals.map((regional, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 px-3 border rounded"
            >
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant={"outline"}>
                      {regional.projects.length}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{regional.projects.length} Project</p>
                  </TooltipContent>
                </Tooltip>

                <h1>{regional.name}</h1>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleClickEdit(regional.id, regional.name)}
                  className="hover:scale-105 cursor-pointer transition-all ease-in-out duration-100"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleClickDelete(regional.id)}
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
          setSelectedRegionalId(null);
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={handleDelete}
        title="Yakin ingin menghapus regional ?"
        message={`Tindakan ini akan mempengaruhi project yang menggunakan project ini, pastikan tidak ada project yang menggunakan regional yang akan dihapus.`}
        confirmButtonText={isDeleting ? "Menghapus..." : "Hapus"}
        cancelButtonText="Batal"
        isLoading={isDeleting}
      />
    </Card>
  );
}
