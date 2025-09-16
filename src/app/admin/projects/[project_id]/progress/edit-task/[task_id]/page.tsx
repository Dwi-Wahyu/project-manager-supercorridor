import NotFoundResource from "@/app/_components/not-found-resource";
import { getTaskById } from "../../queries";
import { EditTaskForm } from "./task-edit-form";
import { getAllUsers } from "@/app/admin/users/queries";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";

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

  const allUsers = await getAllUsers();

  if (!initialData) {
    return <NotFoundResource />;
  }

  console.log(initialData.users_in_charge);

  return (
    <EditTaskForm
      allUsers={allUsers}
      initialData={initialData}
      user_id={session.user.id}
      isAdmin={session.user.role === "admin"}
    />
  );
}
