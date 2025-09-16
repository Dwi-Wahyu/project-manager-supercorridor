import { getProjectById } from "../queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  IconCheck,
  IconChevronLeft,
  IconClockCog,
  IconProgress,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import NotFoundResource from "@/app/_components/not-found-resource";
import { NavigationButton } from "@/app/_components/navigation-button";

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;

  const project = await getProjectById(project_id);

  if (!project) {
    return <NotFoundResource />;
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full relative max-w-2xl shadow-none">
        <Button
          className="top-6 hidden md:inline-flex absolute -left-14"
          variant={"secondary"}
          asChild
        >
          <Link href={"/admin/projects/" + project.category}>
            <IconChevronLeft />
          </Link>
        </Button>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="flex justify-between items-center">
              Detail Proyek
            </CardTitle>
            <CardDescription>
              Informasi lengkap mengenai proyek.
            </CardDescription>
          </div>

          {project.done ? (
            <Badge variant={"success"}>
              <IconCheck /> Selesai
            </Badge>
          ) : (
            <Badge variant={"outline"}>
              <IconProgress /> On Going
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Informasi Dasar</h2>
            <p>
              <strong className="block text-sm text-gray-500">
                Nama Proyek:
              </strong>
              {project.name}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Nomor Proyek:
              </strong>
              {project.project_number}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">Kategori:</strong>
              <Badge>{project.category}</Badge>
            </p>
            <p>
              <strong className="block text-sm text-gray-500">Regional:</strong>
              {project.regional || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">POP:</strong>
              {project.pop || "-"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Informasi Keuangan</h2>
            <p>
              <strong className="block text-sm text-gray-500">BEP:</strong>
              {project.bep || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Nomor SPK:
              </strong>
              {project.spk_number || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Nilai Investasi:
              </strong>
              {project.investment_value || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">Revenue:</strong>
              {project.revenue || "-"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Detail Operasional</h2>
            <p>
              <strong className="block text-sm text-gray-500">TOC:</strong>
              {project.toc || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">MOS:</strong>
              {project.mos || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">Status:</strong>
              {project.status || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Tanggal RFS:
              </strong>
              {project.rfs_date || "-"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Kapasitas</h2>
            <p>
              <strong className="block text-sm text-gray-500">
                Home Pass:
              </strong>
              {project.home_pass || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Home Port:
              </strong>
              {project.home_port || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">
                Home Connected:
              </strong>
              {project.home_connected || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">Sisa:</strong>
              {project.remaining || "-"}
            </p>
            <p>
              <strong className="block text-sm text-gray-500">OCC:</strong>
              {project.occ || "-"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Client</h2>
            {project.client ? <p>{project.client.name}</p> : <p>-</p>}
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              Dibuat pada:{" "}
              {new Date(project.created_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
            <p>
              Diperbarui pada:{" "}
              {new Date(project.updated_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
          </div>

          <NavigationButton url={`/admin/projects/${project.id}/progress`}>
            <IconClockCog className="" />
            Lihat Progress
          </NavigationButton>
        </CardContent>
      </Card>
    </div>
  );
}
