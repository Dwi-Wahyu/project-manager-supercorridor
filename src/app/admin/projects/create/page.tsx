import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { CreateProjectForm } from "./project-create-form";
import { getAllClient } from "../../clients/queries";
import { getRegionals } from "../../pengaturan-aplikasi/queries";

export default async function InputProjectPage() {
  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  if (session.user.role !== "admin") {
    return <UnauthorizedPage />;
  }

  const allClient = await getAllClient();
  const regionals = await getRegionals();

  return (
    <CreateProjectForm
      allClient={allClient}
      category="ftth"
      regionals={regionals}
    />
  );
}
