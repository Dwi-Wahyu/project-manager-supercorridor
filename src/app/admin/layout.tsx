import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import ClientAdminLayout from "../_components/client-admin-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
