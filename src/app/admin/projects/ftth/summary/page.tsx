import {
  getOnGoingProjectGroupByRegional,
  getProjectGroupByStatus,
  getProjectGroupByYear,
  getProjectsSummary,
} from "../../queries";

import { Card, CardContent } from "@/components/ui/card";
import { ProjectBerjalanPieChart } from "./project-berjalan-pie-chart";
import { PageTitle } from "@/app/_components/page-title";
import { PageDescription } from "@/app/_components/page-description";
import { ProjectSelesaiPieChart } from "./project-selesai-pie-chart";
import { CircleAlert } from "lucide-react";

export default async function FTTHProjectSummaryPage() {
  const projectsSummery = await getProjectsSummary("ftth");

  console.log(projectsSummery);

  return (
    <div className="flex flex-col gap-y-5">
      <Card className="border-t-2  border-primary">
        <CardContent className="text-center">
          <PageTitle title="FTTH" />
          <div className="flex gap-2 justify-center text-muted-foreground items-center">
            <CircleAlert className="w-4 h-4" />
            <PageDescription text="Data Belum Akurat" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        <Card className="text-center">
          <CardContent>
            <h1 className="font-semibold text-lg mb-3">Semua Project</h1>

            <div className="flex flex-col md:flex-row justify-evenly items-center">
              <div>
                <h1 className="text-muted-foreground">Total</h1>
                <h1 className="font-semibold">{projectsSummery.total.sum}</h1>
              </div>

              <div>
                <h1 className="text-muted-foreground">Port</h1>
                <h1 className="font-semibold">{projectsSummery.total.port}</h1>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent>
            <h1 className="font-semibold text-lg mb-3">On Going</h1>

            <div className="flex flex-col md:flex-row justify-evenly items-center">
              <div>
                <h1 className="text-muted-foreground">Total</h1>
                <h1 className="font-semibold">{projectsSummery.onGoing.sum}</h1>
              </div>

              <div>
                <h1 className="text-muted-foreground">Port</h1>
                <h1 className="font-semibold">
                  {projectsSummery.onGoing.port}
                </h1>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent>
            <h1 className="font-semibold text-lg mb-3">Selesai</h1>

            <div className="flex flex-col md:flex-row justify-evenly items-center">
              <div>
                <h1 className="text-muted-foreground">Total</h1>
                <h1 className="font-semibold">{projectsSummery.done.sum}</h1>
              </div>

              <div>
                <h1 className="text-muted-foreground">Port</h1>
                <h1 className="font-semibold">{projectsSummery.done.port}</h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className=" gap-5 grid grid-cols-1 md:grid-cols-2 ">
        <ProjectBerjalanPieChart />
        <ProjectSelesaiPieChart />
      </div>
    </div>
  );
}
