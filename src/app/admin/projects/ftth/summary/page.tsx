import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/app/_components/page-title";
import { IdlePortTable } from "../../_summary/idle-port-table";
import { OccupancyPortTable } from "../../_summary/occupancy-port-table";
import { ProjectBarChart } from "../../_summary/project-bar-chart";
import { getProjectsSummary } from "../../_summary/summary-queries";

export default async function FTTHProjectSummaryPage() {
  const projectsSummery = await getProjectsSummary("ftth");

  return (
    <div className="flex flex-col gap-y-5">
      <Card className="border-t-2  border-primary">
        <CardContent className="text-center">
          <PageTitle title="FTTH" />
        </CardContent>
      </Card>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        <Card className="text-center">
          <CardContent>
            <h1 className="font-semibold text-lg mb-3">Semua Status</h1>

            <div className="flex flex-col md:flex-row justify-evenly items-center">
              <div>
                <h1 className="text-muted-foreground">Total Project</h1>
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
                <h1 className="text-muted-foreground">Total Project</h1>
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
                <h1 className="text-muted-foreground">Total Project</h1>
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

      <IdlePortTable category="ftth" />

      <OccupancyPortTable category="ftth" />

      <ProjectBarChart category="ftth" />
    </div>
  );
}
