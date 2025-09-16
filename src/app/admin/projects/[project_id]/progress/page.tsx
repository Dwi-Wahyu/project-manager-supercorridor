import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { PageDescription } from "@/app/_components/page-description";
import { TabelProjectProgress } from "./tabel-progress";
import {
  ChevronLeft,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
  ClipboardPenLine,
  Eye,
  ListTodo,
} from "lucide-react";
import {
  ProjectProgressSearchParams,
  ProjectSearchParams,
} from "@/validations/search-params/project-search-params";
import { getProjectProgressData, getProjectStatusSummary } from "./queries";
import { getProjectById } from "../../queries";
import NotFoundResource from "@/app/_components/not-found-resource";
import { IconClock } from "@tabler/icons-react";
import { NavigationButton } from "@/app/_components/navigation-button";

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

  const projectStatusSummary = await getProjectStatusSummary(project_id);

  const isAdmin = session.user.role === "admin";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <PageTitle title="Progress Project" />
          <PageDescription text={project.name} />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <NavigationButton url={`/admin/projects`}>
            <ChevronLeft />
            Kembali
          </NavigationButton>

          <NavigationButton url={`/admin/projects/${project_id}`}>
            <Eye /> Lihat Detail
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5 mt-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Done</h1>
              {projectStatusSummary.done}
            </div>

            <CircleCheckBig width={40} height={40} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Progress</h1>
              {projectStatusSummary.progress}
            </div>

            <CircleDashed width={40} height={40} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Stuck</h1>
              {projectStatusSummary.stuck}
            </div>

            <CircleAlert width={40} height={40} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Survey</h1>
              {projectStatusSummary.survey}
            </div>

            <ClipboardPenLine width={40} height={40} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton columnCount={6} />}>
            <TabelProjectProgress promises={promises} project_id={project_id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
