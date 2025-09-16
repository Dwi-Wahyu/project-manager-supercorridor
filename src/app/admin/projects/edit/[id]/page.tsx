import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { getAllClient } from "@/app/admin/clients/queries";
import { auth } from "@/config/auth";
import { EditProjectForm } from "./project-edit-form";
import { getProjectById } from "../../queries";
import NotFoundResource from "@/app/_components/not-found-resource";

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

  const allClient = await getAllClient();

  const initialData = await getProjectById(id);

  if (!initialData) {
    return <NotFoundResource />;
  }

  console.log(initialData.client_id);

  return <EditProjectForm allClient={allClient} initialData={initialData} />;
}
