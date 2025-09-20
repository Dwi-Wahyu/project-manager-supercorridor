import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";

import { ProjectSearchParams } from "@/validations/search-params/project-search-params";
import { getProjectData } from "../queries";
import { TabelProject } from "../tabel-project";
import { getRegionals } from "../../pengaturan-aplikasi/queries";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function FtthProjectsPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = ProjectSearchParams.parse(searchParams);

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  let updatedSearch = {
    ...search,
    category: "ftth",
  };

  const promises = await getProjectData(updatedSearch);

  const isAdmin = (await session.user.role) === "admin";

  const regionals = await getRegionals();

  return (
    <div>
      <Card className="border-t-2 mb-5 border-primary">
        <CardContent className="text-center">
          <PageTitle title="FTTH" />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton columnCount={7} />}>
            <TabelProject
              promises={promises}
              isAdmin={isAdmin}
              regionals={regionals}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
