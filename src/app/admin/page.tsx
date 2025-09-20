import { auth } from "@/config/auth";
import UnauthorizedPage from "../_components/unauthorized-page";
import DashboardCard from "../_components/dashboard-card";
import {
  IconBuildingWarehouse,
  IconChartDots3,
  IconClipboardData,
  IconHeartHandshake,
  IconScan,
  IconUsersGroup,
} from "@tabler/icons-react";
import { BriefcaseBusiness, HouseWifi, ListTodo } from "lucide-react";
import { getProjectSum } from "./projects/queries";
import { getClientSum } from "./clients/queries";
import { getMaterialSum } from "./materials/queries";
import { getUserSum } from "./users/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const projectSum = await getProjectSum();
  const clientSum = await getClientSum();
  const materialSum = await getMaterialSum();
  const userSum = await getUserSum();

  const workersLastActivity = await prisma.task.findMany({
    where: {
      updated_by_user: {
        role: "workers",
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-4 font-semibold text-primary-foreground text-xl">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          className="overflow-hidden shadow-lg bg-gradient-to-tr from-primary to-primary/60 w-full relative rounded-xl  p-5"
          href={"/admin/projects/ftth/summary"}
        >
          <div className="w-full pr-20 text-background">
            <h1 className="text-lg font-semibold">FTTH</h1>
            <h1 className="text-sm">Lihat Summary Project FTTH</h1>
            <Button
              variant={"link"}
              className="mt-2 bg-transparent p-0 underline underline-offset-2 text-background"
            >
              Lihat Summary
            </Button>
          </div>

          <HouseWifi className="absolute -right-9 -top-5 w-36 h-36 text-background" />
        </Link>

        <Link
          className="overflow-hidden shadow-lg bg-gradient-to-tr from-primary to-primary/60 w-full relative rounded-xl  p-5"
          href={"/admin/projects/backbone/summary"}
        >
          <div className="w-full pr-24 text-background">
            <h1 className="text-lg font-semibold">Backbone</h1>
            <h1 className="text-sm">Lihat Summary Project Backbone</h1>
            <Button
              variant={"link"}
              className="mt-2 bg-transparent p-0 underline underline-offset-2 text-background"
            >
              Lihat Summary
            </Button>
          </div>

          <IconChartDots3 className="absolute -right-7 -top-7 w-36 h-36 text-background" />
        </Link>
      </div>

      <Card className="mt-5">
        <CardContent>
          <div className="flex gap-1 items-center mb-3">
            <ListTodo className="w-5 h-5" />
            <h1 className="font-semibold">
              Aktivitas Terakhir Pekerja Lapangan
            </h1>
          </div>

          <div className="flex gap-4">
            {workersLastActivity.length > 0 ? (
              <div>
                <h1>al</h1>
              </div>
            ) : (
              <div className="w-full">
                <h1 className="italic text-center text-muted-foreground">
                  Belum Ada Aktivitas
                </h1>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
