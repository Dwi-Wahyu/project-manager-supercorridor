import { PageTitle } from "@/app/_components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "nuqs";
import { auth } from "@/config/auth";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { Separator } from "@/components/ui/separator";
import { PageDescription } from "@/app/_components/page-description";
import {
  IconBuildingWarehouse,
  IconClipboardData,
  IconUsers,
} from "@tabler/icons-react";
import { getMaterialData } from "./queries";
import { TabelMaterial } from "./tabel-material";
import { Contact, FolderOpenDot } from "lucide-react";
import { MaterialSearchParams } from "@/validations/search-params/material-search-params";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function KehadiranPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = MaterialSearchParams.parse(searchParams);

  const session = await auth();

  if (!session) {
    return <UnauthorizedPage />;
  }

  const promises = await getMaterialData(search);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-center text-center gap-2 mb-5">
          {/* <IconBuildingWarehouse className="w-11 h-11" /> */}

          <div>
            <PageTitle title="Material" />
            <PageDescription text="Daftar Material" />
          </div>
        </div>
        <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
          <TabelMaterial promises={promises} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
