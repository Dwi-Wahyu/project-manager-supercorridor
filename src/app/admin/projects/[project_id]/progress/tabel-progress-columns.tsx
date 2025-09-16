"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, SquarePen, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { formatDateToYYYYMMDD } from "@/helper/date-helper";
import { Badge } from "@/components/ui/badge";
import { deleteTask } from "./actions";
import { ProjectProgressColumnType } from "./tabel-progress";
import { useSession } from "next-auth/react";

export const TabelProjectProgressColumns: ColumnDef<ProjectProgressColumnType>[] =
  [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "lop",
      header: "LOP",
    },
    {
      accessorKey: "port",
      header: "Port",
    },
    {
      accessorKey: "priority",
      header: "Prioritas",
    },
    {
      accessorKey: "updated_at",
      header: "Diupdate Pada",
      cell: function Cell({ row }) {
        return <div>{formatDateToYYYYMMDD(row.original.updated_at)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: function Cell({ row }) {
        const { status } = row.original;

        switch (status) {
          case "progress":
            return <Badge>{status}</Badge>;
          case "done":
            return <Badge variant={"success"}>{status}</Badge>;
          case "stuck":
            return <Badge variant={"destructive"}>{status}</Badge>;
          case "survey":
            return <Badge variant={"secondary"}>{status}</Badge>;
        }
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const task = row.original;
        const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
        const [isDeleting, setIsDeleting] = useState(false);

        const session = useSession();

        if (!session.data) {
          return <div></div>;
        }

        const isAdmin = session.data.user.role === "admin";

        const handleDeleteTask = async () => {
          setIsDeleting(true);

          try {
            const result = await deleteTask(task.id);

            if (result.success) {
              toast.success(result.message || "Task berhasil dihapus!");
            } else {
              toast.error(result.error?.message || "Gagal menghapus task.");
            }
          } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Terjadi kesalahan tak terduga saat menghapus task.");
          } finally {
            setIsDeleting(false);
            setIsConfirmDialogOpen(false);
          }
        };

        return (
          <div className="flex gap-2">
            <Button size={"icon"} variant={"outline"} asChild>
              <Link
                href={`/admin/projects/${task.project_id}/progress/edit-task/${task.id}`}
              >
                <SquarePen className="" />
              </Link>
            </Button>
            <Button size={"icon"} variant={"outline"} asChild>
              <Link
                href={`/admin/projects/${task.project_id}/progress/${task.id}`}
              >
                <Eye className="" />
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
              onConfirm={handleDeleteTask}
              title="Konfirmasi Penghapusan"
              message={`Apakah Anda yakin ingin menghapus task "${task.name}" ? Tindakan ini tidak dapat dibatalkan.`}
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
