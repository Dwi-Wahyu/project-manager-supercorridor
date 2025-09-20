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
  return (
    <div className="relative">
      <div className="from-primary to-background bg-gradient-to-b h-[30svh] fixed left-0 top-0 -z-10 w-full"></div>

      <ClientAdminLayout>{children}</ClientAdminLayout>
    </div>
  );
}
