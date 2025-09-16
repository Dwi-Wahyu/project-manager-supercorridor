"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { updateClient } from "./actions";
import { Client } from "@/app/generated/prisma";
import {
  UpdateClientSchema,
  UpdateClientSchemaType,
} from "@/validations/schemas/client";
import { Edit } from "lucide-react";

export function EditClientDialog({ client }: { client: Client }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateClientSchemaType>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      id: client.id,
      name: client.name,
    },
  });

  const onSubmit = async (payload: UpdateClientSchemaType) => {
    setIsLoading(true);

    const result = await updateClient(payload);

    if (result.success) {
      setIsOpen(false);
      toast.success("Berhasil edit client");
    } else {
      toast.error(result.error.message);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Edit /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Data Client</DialogTitle>
          <DialogDescription>
            Masukkan data client yang sesuai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Client</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <IconLoader className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
