"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientColumnType } from "./tabel-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, SquarePen, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { IconCategoryPlus, IconClockCog } from "@tabler/icons-react";
import { deleteClient } from "./actions";
import { EditClientDialog } from "./client-edit-dialog";

export const TabelClientColumns: ColumnDef<ClientColumnType>[] = [
  {
    accessorKey: "name",
    header: "Nama Client",
  },
  {
    header: "Jumlah Project",
    cell: function Cell({ row }) {
      return <div>{row.original.projects.length}</div>;
    },
  },

  {
    id: "actions",
    cell: function Cell({ row }) {
      const client = row.original;
      const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      const handleDeleteClient = async () => {
        setIsDeleting(true);

        try {
          const result = await deleteClient(client.id);

          if (result.success) {
            toast.success(result.message || "Client berhasil dihapus!");
          } else {
            toast.error(result.error?.message || "Gagal menghapus client.");
          }

          setIsConfirmDialogOpen(false);
        } catch (error) {
          console.error("Error deleting client:", error);
          toast.error("Terjadi kesalahan tak terduga saat menghapus client.");
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex gap-2">
          <EditClientDialog client={client} />

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
            onConfirm={handleDeleteClient}
            title="Konfirmasi Penghapusan"
            message={`Apakah Anda yakin ingin menghapus client "${client.name}" ? Tindakan ini tidak dapat dibatalkan.`}
            confirmButtonText={isDeleting ? "Menghapus..." : "Hapus"}
            cancelButtonText="Batal"
            isLoading={isDeleting}
          />
        </div>
      );
    },
    size: 5,
  },
];
