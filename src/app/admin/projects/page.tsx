import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { PageDescription } from "@/app/_components/page-description";
import { getProjectData } from "./queries";
import { TabelProject } from "./tabel-project";
import { FolderOpenDot } from "lucide-react";
import { ProjectSearchParams } from "@/validations/search-params/project-search-params";
import { getRegionals } from "../pengaturan-aplikasi/queries";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProjectsPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = ProjectSearchParams.parse(searchParams);

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const promises = await getProjectData(search);

  const isAdmin = (await session.user.role) === "admin";

  const regionals = await getRegionals();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-5">
          <FolderOpenDot className="w-11 h-11" />

          <div>
            <PageTitle title="Manajemen Project" />
            <PageDescription text="Lihat Progress Setiap Project" />
          </div>
        </div>
        <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
          <TabelProject
            promises={promises}
            isAdmin={isAdmin}
            regionals={regionals}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
