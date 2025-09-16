"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputTaskSchema,
  InputTaskSchemaType,
  TaskPrioritySchema,
  TaskStatusSchema,
} from "@/validations/schemas/task";
import { IconChevronLeft, IconLoader, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { getAllUsers } from "@/app/admin/users/queries";
import MultipleSelector from "@/components/multiple-select";
import { useRouter } from "nextjs-toploader/app";
import { createTask } from "../actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export function CreateTaskForm({
  project_id,
  user_id,
  allUsers,
}: {
  project_id: string;
  user_id: string;
  allUsers: Awaited<ReturnType<typeof getAllUsers>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InputTaskSchemaType>({
    resolver: zodResolver(InputTaskSchema),
    defaultValues: {
      project_id,
      name: "",
      lop: "",
      port: "",
      status: "progress",
      priority: "low",
      users_in_charge: [],
      created_by_user_id: user_id,
      notes: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (payload: InputTaskSchemaType) => {
    setIsLoading(true);
    const result = await createTask(payload);

    if (result.success) {
      setIsLoading(false);
      toast.success("Berhasil input task");

      setTimeout(() => {
        router.push(`/admin/projects/${project_id}/progress/`);
      }, 2000);
    } else {
      setIsLoading(false);
      toast.error(result.error.message || "Terjadi kesalahan saat input task");
    }
  };

  const allUsersOptions = allUsers.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full relative max-w-xl shadow-none">
        <Button
          className="top-6 hidden md:inline-flex absolute -left-14"
          variant={"secondary"}
          asChild
        >
          <Link href={`/admin/projects/${project_id}/progress`}>
            <IconChevronLeft />
          </Link>
        </Button>
        <CardHeader>
          <CardTitle>Input Task Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-lg space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Task</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TaskStatusSchema.options.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioritas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TaskPrioritySchema.options.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() +
                              priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>

                    <Textarea {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="users_in_charge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penanggung Jawab</FormLabel>

                    <MultipleSelector
                      options={allUsersOptions}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <IconLoader className="animate-spin mr-2" />
                      Loading
                    </>
                  ) : (
                    <>
                      <IconPlus className="mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
