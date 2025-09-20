import NotFoundResource from "@/app/_components/not-found-resource";
import { getTaskById } from "../../queries";
import { EditTaskForm } from "./task-edit-form";
import { getAllUsers } from "@/app/admin/users/queries";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { getTaskStatus } from "@/app/admin/pengaturan-aplikasi/queries";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ task_id: string }>;
}) {
  const { task_id } = await params;

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  if (isNaN(parseInt(task_id))) {
    return <NotFoundResource />;
  }

  const initialData = await getTaskById(parseInt(task_id));

  if (!initialData) {
    return <NotFoundResource />;
  }

  const allUsers = await getAllUsers();

  const taskStatus = await getTaskStatus();

  return (
    <EditTaskForm
      allUsers={allUsers}
      initialData={initialData}
      user_id={session.user.id}
      isAdmin={session.user.role === "admin"}
      taskStatus={taskStatus}
    />
  );
}
