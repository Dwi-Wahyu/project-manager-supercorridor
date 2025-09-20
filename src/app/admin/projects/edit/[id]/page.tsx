import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { getAllClient } from "@/app/admin/clients/queries";
import { auth } from "@/config/auth";
import { EditProjectForm } from "./project-edit-form";
import { getProjectById } from "../../queries";
import NotFoundResource from "@/app/_components/not-found-resource";
import { getRegionals } from "@/app/admin/pengaturan-aplikasi/queries";

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  if (session.user.role !== "admin") {
    return <UnauthorizedPage />;
  }

  const initialData = await getProjectById(id);

  if (!initialData) {
    return <NotFoundResource />;
  }

  const allClient = await getAllClient();
  const regionals = await getRegionals();

  return (
    <EditProjectForm
      allClient={allClient}
      regionals={regionals}
      initialData={initialData}
    />
  );
}
