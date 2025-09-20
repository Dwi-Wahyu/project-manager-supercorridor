"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProjectColumnType } from "./tabel-project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ellipsis, Eye, MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { IconClockCog } from "@tabler/icons-react";
import { deleteProject } from "./actions";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TabelProjectColumns: ColumnDef<ProjectColumnType>[] = [
  {
    accessorKey: "year",
    header: "Tahun",
  },
  {
    accessorKey: "regional",
    header: "Regional",
    cell: function Cell({ row }) {
      return row.original.regional.name;
    },
  },
  {
    accessorKey: "project_number",
    header: "No. Project",
    cell: function Cell({ row }) {
      const { project_number } = row.original;

      if (project_number) {
        return <div>{project_number}</div>;
      }

      return <div>-</div>;
    },
  },
  {
    accessorKey: "pop",
    header: "POP",
    cell: function Cell({ row }) {
      const { pop } = row.original;

      if (pop) {
        return <div>{pop}</div>;
      }

      return <div>-</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "home_port",
    header: "PORT",
    cell: function Cell({ row }) {
      const { home_port } = row.original;

      if (home_port) {
        return <div>{home_port}</div>;
      }

      return <div>-</div>;
    },
  },
  {
    header: "Client",
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
    cell: function Cell({ row }) {
      const { status } = row.original;

      if (status) {
        return <div>{status}</div>;
      }

      return <div>-</div>;
    },
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
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="w-8 h-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}/progress`}>
                  <IconClockCog className="" />
                  Lihat Progress
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href={`/admin/projects/edit/${project.id}`}>
                    <SquarePen className="" />
                    Edit Project
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}/progress`}>
                  <Eye className="" />
                  Lihat Detail
                </Link>
              </DropdownMenuItem>

              {isAdmin && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  <Trash className="" />
                  Hapus
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmationDialog
            isOpen={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
            onConfirm={handleDeleteProject}
            title="Konfirmasi Penghapusan"
            message={`Apakah Anda yakin ingin menghapus project "${project.name}" ? Tindakan ini tidak dapat dibatalkan.`}
            confirmButtonText={isDeleting ? "Menghapus..." : "Hapus"}
            cancelButtonText="Batal"
            isLoading={isDeleting}
          />
        </>
      );
    },
    size: 5,
  },
];
