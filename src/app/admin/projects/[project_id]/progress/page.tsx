import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { TabelProjectProgress } from "./tabel-progress";
import { Eye, ListTodo } from "lucide-react";
import {
  ProjectProgressSearchParams,
  ProjectSearchParams,
} from "@/validations/search-params/project-search-params";
import { getProjectProgressData, getProjectStatusSummary } from "./queries";
import { getProjectById } from "../../queries";
import NotFoundResource from "@/app/_components/not-found-resource";
import { IconClock } from "@tabler/icons-react";
import { NavigationButton } from "@/app/_components/navigation-button";
import { getTaskStatus } from "@/app/admin/pengaturan-aplikasi/queries";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ project_id: string }>;
}

export default async function ProjectProgressPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = ProjectProgressSearchParams.parse(searchParams);

  const { project_id } = await props.params;

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  let updatedSearch = {
    ...search,
    project_id,
  };

  const promises = await getProjectProgressData(updatedSearch);

  const project = await getProjectById(project_id);

  if (!project) {
    return <NotFoundResource />;
  }

  const statusSummary = await getProjectStatusSummary(project_id);

  const isAdmin = session.user.role === "admin";

  const taskStatus = await getTaskStatus();

  return (
    <div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-5">
        {statusSummary.map((status, idx) => (
          <Card key={idx}>
            <CardContent className="flex items-center justify-between">
              <h1>{status.label}</h1>
              <h1 className="font-semibold">{status._count.tasks}</h1>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <PageTitle title={project.name} />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <NavigationButton url={`/admin/projects/${project_id}`}>
                <Eye /> Lihat Detail Project
              </NavigationButton>

              {isAdmin && (
                <NavigationButton
                  url={`/admin/projects/${project_id}/progress/input-task`}
                  variant="default"
                >
                  <ListTodo /> Input Task
                </NavigationButton>
              )}
            </div>
          </div>

          <Suspense fallback={<DataTableSkeleton columnCount={6} />}>
            <TabelProjectProgress promises={promises} taskStatus={taskStatus} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
