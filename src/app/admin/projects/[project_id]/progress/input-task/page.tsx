import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { auth } from "@/config/auth";
import { CreateTaskForm } from "./task-create-form";
import { getAllUsers } from "@/app/admin/users/queries";
import { getTaskStatus } from "@/app/admin/pengaturan-aplikasi/queries";

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

  if (session.user.role !== "admin") {
    return <UnauthorizedPage />;
  }

  const allUsers = await getAllUsers();

  const taskStatus = await getTaskStatus();

  return (
    <CreateTaskForm
      project_id={project_id}
      user_id={session.user.id}
      allUsers={allUsers}
      taskStatus={taskStatus}
    />
  );
}
