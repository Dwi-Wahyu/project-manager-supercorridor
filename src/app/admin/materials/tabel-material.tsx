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
import { getMaterialData } from "./queries";
import { TabelMaterialColumns } from "./tabel-material-columns";
import { InputMaterialDialog } from "./material-input-dialog";
import { useState } from "react";
import { Material } from "@/app/generated/prisma";
import { DataTableLimitSelect } from "@/components/data-table/data-table-limit-select";

type TableType = Awaited<ReturnType<typeof getMaterialData>>;

export type MaterialColumnType = TableType["data"][number];

export function TabelMaterial({ promises }: { promises: TableType }) {
  const { data, filtered, pageCount } = promises;

  const [name, setName] = useQueryState("name", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const { table } = useDataTable({
    data,
    columns: TabelMaterialColumns,
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
    setName("");
  }

  const session = useSession();

  if (session.status === "unauthenticated") {
    return <UnauthorizedPage />;
  }

  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <div className="flex items-center justify-between w-full flex-col sm:flex-row">
            <Input
              placeholder="Cari Nama . . ."
              value={name}
              className="w-fit"
              onChange={(e) => setName(e.target.value)}
            />

            <DataTableLimitSelect table={table} />

            <InputMaterialDialog />
          </div>
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}
