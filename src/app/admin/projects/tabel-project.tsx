"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";

import { Button } from "@/components/ui/button";
import { FunnelX } from "lucide-react";
import Link from "next/link";
import { getProjectData } from "./queries";
import { TabelProjectColumns } from "./tabel-project-columns";
import { DataTableLimitSelect } from "@/components/data-table/data-table-limit-select";
import { Regional } from "@/app/generated/prisma";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconFilterX } from "@tabler/icons-react";

type TableType = Awaited<ReturnType<typeof getProjectData>>;

export type ProjectColumnType = TableType["data"][number];

export function TabelProject({
  promises,
  isAdmin,
  regionals,
}: {
  promises: TableType;
  isAdmin: boolean;
  regionals: Regional[];
}) {
  const { data, filtered, pageCount } = promises;

  const [name, setName] = useQueryState("name", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const [regional, setRegional] = useQueryState("regional", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const [year, setYear] = useQueryState("year", {
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

  function clearFilter() {
    setName("");
    setRegional("");
    setYear("");
  }

  return (
    <DataTable table={table}>
      <DataTableAdvancedToolbar table={table}>
        <div className="flex items-center justify-between w-full flex-col sm:flex-row">
          <div className="flex gap-2">
            <Input
              placeholder="Cari Nama Project"
              className="w-fit"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select value={year} onValueChange={(value) => setYear(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Tahun" />
              </SelectTrigger>
              <SelectContent>
                {["2024", "2025", "2026"].map((year, idx) => (
                  <SelectItem value={year} key={idx}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={regional}
              onValueChange={(value) => setRegional(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter Regional" />
              </SelectTrigger>
              <SelectContent>
                {regionals.map((regional, idx) => (
                  <SelectItem value={regional.id} key={idx}>
                    {regional.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button size={"icon"} onClick={clearFilter} variant={"outline"}>
              <IconFilterX />
            </Button>

            {isAdmin && (
              <Button asChild>
                <Link href="/admin/projects/create">Input Project</Link>
              </Button>
            )}
          </div>

          <DataTableLimitSelect table={table} />
        </div>
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
