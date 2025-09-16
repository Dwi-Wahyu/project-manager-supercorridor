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
import { getProjectProgressData } from "./queries";
import { TabelProjectProgressColumns } from "./tabel-progress-columns";
import {
  TaskPrioritySchema,
  TaskStatusSchema,
} from "@/validations/schemas/task";

type TableType = Awaited<ReturnType<typeof getProjectProgressData>>;

export type ProjectProgressColumnType = TableType["data"][number];

export function TabelProjectProgress({
  promises,
  project_id,
}: {
  promises: TableType;
  project_id: string;
}) {
  const { data, filtered, pageCount } = promises;

  const [name, setName] = useQueryState("name", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const { table } = useDataTable({
    data,
    columns: TabelProjectProgressColumns,
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

  const [status, setStatus] = useQueryState("status", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const [priority, setPriority] = useQueryState("priority", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  function handleClear() {
    setName("");
    setStatus("");
    setPriority("");
  }

  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <div className="flex items-center justify-between w-full flex-col sm:flex-row">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Cari berdasarkan nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Select
                onValueChange={setStatus}
                required={false}
                defaultValue={status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  {TaskStatusSchema.options.map((status, idx) => (
                    <SelectItem value={status} key={idx}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={setPriority}
                required={false}
                defaultValue={priority}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Prioritas" />
                </SelectTrigger>
                <SelectContent>
                  {TaskPrioritySchema.options.map((priority, idx) => (
                    <SelectItem value={priority} key={idx}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant={"outline"} onClick={handleClear}>
                <FunnelX />
              </Button>
            </div>
          </div>
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}
