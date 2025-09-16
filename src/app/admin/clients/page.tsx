import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { PageDescription } from "@/app/_components/page-description";
import { getClientData } from "./queries";
import { TabelClient } from "./tabel-client";
import { Contact } from "lucide-react";
import { ClientSearchParams } from "@/validations/search-params/client-search-params";
import { IconHeartHandshake } from "@tabler/icons-react";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function KehadiranPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = ClientSearchParams.parse(searchParams);

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const promises = await getClientData(search);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-5">
          <IconHeartHandshake className="w-11 h-11" />

          <div>
            <PageTitle title="Client" />
            <PageDescription text="Daftar Client Kerjasama" />
          </div>
        </div>
        <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
          <TabelClient promises={promises} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
