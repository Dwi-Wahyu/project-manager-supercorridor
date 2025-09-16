import DashboardCard from "../_components/dashboard-card";
import { auth } from "@/config/auth";
import UnauthorizedPage from "../_components/unauthorized-page";
import {
  IconBuildingWarehouse,
  IconHeartHandshake,
  IconUsersGroup,
} from "@tabler/icons-react";
import { BriefcaseBusiness } from "lucide-react";
import { getProjectSum } from "./projects/queries";
import { getClientSum } from "./clients/queries";
import { getMaterialSum } from "./materials/queries";
import { getUserSum } from "./users/queries";

export async function DashboardAdmin() {
  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

  const projectSum = await getProjectSum();
  const clientSum = await getClientSum();
  const materialSum = await getMaterialSum();
  const userSum = await getUserSum();

  return (
    <div>
      <h1 className="mb-4 font-semibold">
        Selamat Datang, {session.user.name}
      </h1>

      <div className="grid mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <DashboardCard
          title="User"
          value={userSum.toString()}
          icon={
            <IconUsersGroup
              width={48}
              height={48}
              className="text-muted-foreground"
            />
          }
        />

        <DashboardCard
          title="Material"
          value={materialSum.toString()}
          icon={
            <IconBuildingWarehouse
              width={48}
              height={48}
              className="text-muted-foreground"
            />
          }
        />

        <DashboardCard
          title="Client"
          value={clientSum.toString()}
          icon={
            <IconHeartHandshake
              width={48}
              height={48}
              className="text-muted-foreground"
            />
          }
        />

        <DashboardCard
          title="Project"
          value={projectSum.toString()}
          icon={
            <BriefcaseBusiness
              width={48}
              height={48}
              className="text-muted-foreground"
            />
          }
        />
      </div>
    </div>
  );
}
