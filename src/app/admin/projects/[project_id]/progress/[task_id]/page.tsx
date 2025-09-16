import NotFoundResource from "@/app/_components/not-found-resource";
import { getTaskById } from "../queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { NavigationButton } from "@/app/_components/navigation-button";
import { Edit } from "lucide-react";

export default async function DetailTaskPage({
  params,
}: {
  params: Promise<{ task_id: string }>;
}) {
  const { task_id } = await params;

  const taskId = parseInt(task_id);

  if (isNaN(taskId)) {
    return <NotFoundResource />;
  }

  const initialData = await getTaskById(taskId);

  if (!initialData) {
    return <NotFoundResource />;
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full relative max-w-2xl shadow-none">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Detail Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Informasi Dasar</h2>
            <p>
              <strong className="block text-sm text-muted-foreground">
                Nama Task:
              </strong>
              {initialData.name}
            </p>
            <p>
              <strong className="block text-sm text-muted-foreground">
                LOP:
              </strong>
              {initialData.lop || "-"}
            </p>
            <p>
              <strong className="block text-sm text-muted-foreground">
                Port:
              </strong>
              {initialData.port || "-"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Status & Prioritas</h2>
            <p className="flex items-center gap-2">
              <strong className="text-sm text-muted-foreground">Status:</strong>
              <Badge>{initialData.status}</Badge>
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-sm text-muted-foreground">
                Prioritas:
              </strong>
              <Badge variant="outline">{initialData.priority}</Badge>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Keterangan</h2>
            <div className="rounded-md border p-4 text-sm">
              {initialData.notes || "Tidak ada keterangan."}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Penanggung Jawab</h2>
            {initialData.users_in_charge &&
            initialData.users_in_charge.length > 0 ? (
              <ul className="space-y-2">
                {initialData.users_in_charge.map((user) => (
                  <li key={user.id} className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 text-muted-foreground" />
                    <span>{user.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">-</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Dibuat pada{" "}
              {new Date(initialData.created_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
            <p>
              Diperbarui pada{" "}
              {new Date(initialData.updated_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
            <p>Diperbarui oleh {initialData.updated_by_user?.name ?? "-"}</p>
          </div>

          <div className="flex md:justify-end justify-center gap-2">
            <NavigationButton
              url={`/admin/projects/${initialData.project_id}/progress`}
              label="Kembali"
            />
            <NavigationButton
              url={`/admin/projects/${initialData.project_id}/progress/edit-task/${initialData.id}`}
              variant={"default"}
            >
              <Edit />
              Edit
            </NavigationButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
