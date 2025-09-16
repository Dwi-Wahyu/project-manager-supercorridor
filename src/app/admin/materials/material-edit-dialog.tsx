"use material";

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
  UpdateMaterialSchema,
  UpdateMaterialSchemaType,
} from "@/validations/schemas/material";
import { IconLoader, IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { createMaterial, updateMaterial } from "./actions";
import { Material } from "@/app/generated/prisma";
import { Edit, Save } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export function EditMaterialDialog({ material }: { material: Material }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<UpdateMaterialSchemaType>({
    resolver: zodResolver(UpdateMaterialSchema),
    defaultValues: {
      id: material.id,
      name: material.name,
      quantity: material.quantity,
    },
  });

  const onSubmit = async (payload: UpdateMaterialSchemaType) => {
    setIsLoading(true);

    const result = await updateMaterial(payload);

    if (result.success) {
      router.refresh();
      setIsOpen(false);
      toast.success("Berhasil update material");
    } else {
      toast.error(result.error.message);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <Edit /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update data Material Baru</DialogTitle>
          <DialogDescription>
            Masukkan data material yang sesuai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuantitas</FormLabel>
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
                  <>
                    <Save />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
