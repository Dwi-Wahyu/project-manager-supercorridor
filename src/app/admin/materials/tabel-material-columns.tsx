"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MaterialColumnType } from "./tabel-material";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, SquarePen, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { IconCategoryPlus, IconClockCog } from "@tabler/icons-react";
import { deleteMaterial } from "./actions";
import { EditMaterialDialog } from "./material-edit-dialog";

export const TabelMaterialColumns: ColumnDef<MaterialColumnType>[] = [
  {
    accessorKey: "name",
    header: "Mitra",
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas",
  },

  {
    id: "actions",
    cell: function Cell({ row }) {
      const material = row.original;
      const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      const handleDeleteMaterial = async () => {
        setIsDeleting(true);

        try {
          const result = await deleteMaterial(material.id);

          if (result.success) {
            toast.success(result.message || "Material berhasil dihapus!");
          } else {
            toast.error(result.error?.message || "Gagal menghapus material.");
          }

          setIsConfirmDialogOpen(false);
        } catch (error) {
          console.error("Error deleting material:", error);
          toast.error("Terjadi kesalahan tak terduga saat menghapus material.");
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex gap-2">
          <EditMaterialDialog material={material} />

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => setIsConfirmDialogOpen(true)}
          >
            <Trash />
            Hapus
          </Button>

          <ConfirmationDialog
            isOpen={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
            onConfirm={handleDeleteMaterial}
            title="Konfirmasi Penghapusan"
            message={`Apakah Anda yakin ingin menghapus material "${material.name}" ? Tindakan ini tidak dapat dibatalkan.`}
            confirmButtonText={isDeleting ? "Menghapus..." : "Hapus"}
            cancelButtonText="Batal"
            isLoading={isDeleting}
            confirmButtonVariant="destructive"
          />
        </div>
      );
    },
    size: 5,
  },
];
