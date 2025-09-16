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
import {
  InputClientSchema,
  InputClientSchemaType,
} from "@/validations/schemas/client";
import { IconLoader, IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { createClient } from "./actions";

export function InputClientDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InputClientSchemaType>({
    resolver: zodResolver(InputClientSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (payload: InputClientSchemaType) => {
    setIsLoading(true);

    const result = await createClient(payload);

    if (result.success) {
      setIsOpen(false);
      toast.success("Berhasil input client");
      form.reset();
    } else {
      toast.error(result.error.message);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus /> Input Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Input Data Client Baru</DialogTitle>
          <DialogDescription>
            Masukkan nama client yang akan ditambahkan.
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
