"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProjectColumnType } from "./tabel-project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, SquarePen, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { IconCategoryPlus, IconClockCog } from "@tabler/icons-react";
import { deleteProject } from "./actions";
import { useSession } from "next-auth/react";

export const TabelProjectColumns: ColumnDef<ProjectColumnType>[] = [
  {
    accessorKey: "year",
    header: "Tahun",
  },
  {
    accessorKey: "regional",
    header: "Regional",
  },
  {
    accessorKey: "project_number",
    header: "No. Project",
  },
  {
    accessorKey: "pop",
    header: "POP",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "home_port",
    header: "PORT",
  },
  {
    header: "PORT",
    cell: function Cell({ row }) {
      const { client } = row.original;

      if (client) {
        return <div>{client.name}</div>;
      }

      return <div>-</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const project = row.original;
      const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      const session = useSession();

      if (!session.data) {
        return <div></div>;
      }

      const isAdmin = session.data.user.role === "admin";

      const handleDeleteProject = async () => {
        setIsDeleting(true);

        try {
          const result = await deleteProject(project.id);

          if (result.success) {
            toast.success(result.message || "Project berhasil dihapus!");
          } else {
            toast.error(result.error?.message || "Gagal menghapus project.");
          }
        } catch (error) {
          console.error("Error deleting project:", error);
          toast.error("Terjadi kesalahan tak terduga saat menghapus project.");
        } finally {
          setIsDeleting(false);
          setIsConfirmDialogOpen(false);
        }
      };

      return (
        <div className="flex gap-2">
          {isAdmin && (
            <Button size={"icon"} variant={"outline"} asChild>
              <Link href={`/admin/projects/edit/${project.id}`}>
                <SquarePen className="" />
              </Link>
            </Button>
          )}

          <Button size={"icon"} variant={"outline"} asChild>
            <Link href={`/admin/projects/${project.id}/progress`}>
              <IconClockCog className="" />
            </Link>
          </Button>
          {isAdmin && (
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => setIsConfirmDialogOpen(true)}
            >
              <Trash className="" />
            </Button>
          )}

          <ConfirmationDialog
            isOpen={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
            onConfirm={handleDeleteProject}
            title="Konfirmasi Penghapusan"
            message={`Apakah Anda yakin ingin menghapus project "${project.name}" ? Tindakan ini tidak dapat dibatalkan.`}
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
