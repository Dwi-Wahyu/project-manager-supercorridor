"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FunnelX } from "lucide-react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { getProjectData } from "./queries";
import { TabelProjectColumns } from "./tabel-project-columns";

type TableType = Awaited<ReturnType<typeof getProjectData>>;

export type ProjectColumnType = TableType["data"][number];

export function TabelProject({
  promises,
  isAdmin,
}: {
  promises: TableType;
  isAdmin: boolean;
}) {
  const { data, filtered, pageCount } = promises;

  const [nama, setNama] = useQueryState("nama", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const { table } = useDataTable({
    data,
    columns: TabelProjectColumns,
    pageCount: pageCount,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  function handleClear() {
    setNama("");
  }

  const session = useSession();

  return (
    <DataTable table={table}>
      <DataTableAdvancedToolbar table={table}>
        <div className="flex items-center justify-between w-full flex-col sm:flex-row">
          <div className="flex gap-2 items-center ">
            <Input
              placeholder="Cari Nama . . ."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            <Button variant={"outline"} onClick={handleClear}>
              <FunnelX />
            </Button>
          </div>

          {isAdmin && (
            <Button asChild>
              <Link href="/admin/projects/create">
                <IconPlus /> Input Project
              </Link>
            </Button>
          )}
        </div>
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
