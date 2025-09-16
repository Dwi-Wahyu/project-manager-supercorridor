import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { auth } from "@/config/auth";
import { CreateTaskForm } from "./task-create-form";
import { getAllUsers } from "@/app/admin/users/queries";

export default async function createTaskProject({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const allUsers = await getAllUsers();

  if (session.user.role !== "admin") {
    return <UnauthorizedPage />;
  }

  return (
    <CreateTaskForm
      project_id={project_id}
      user_id={session.user.id}
      allUsers={allUsers}
    />
  );
}
