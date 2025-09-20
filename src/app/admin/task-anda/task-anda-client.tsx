"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getWorkerTasks } from "./queries";
import { formatDate } from "@/lib/format";
import { getTaskStatus } from "../pengaturan-aplikasi/queries";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { NavigationButton } from "@/app/_components/navigation-button";

export function TaskAndaClient({
  workerTasks,
  taskStatus,
}: {
  workerTasks: Awaited<ReturnType<typeof getWorkerTasks>>;
  taskStatus: Awaited<ReturnType<typeof getTaskStatus>>;
}) {
  const [status, setStatus] = useQueryState("status", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  const [name, setName] = useQueryState("name", {
    shallow: false,
    clearOnDefault: true,
    defaultValue: "",
  });

  function clearFilter() {
    setStatus("");
    setName("");
  }

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-lg">Filter</h1>

            <Button size={"icon"} variant={"outline"} onClick={clearFilter}>
              <FilterX />
            </Button>
          </div>

          <div className="flex justify-between gap-4 mt-4 items-center">
            <Input
              placeholder="Cari nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select onValueChange={setStatus} required={false} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                {taskStatus.map((status, idx) => (
                  <SelectItem value={status.id} key={idx}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {workerTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workerTasks.map((task, idx) => (
            <Card key={idx}>
              <CardContent>
                <h1 className="text-center font-semibold">{task.name}</h1>
                <div className="mt-3 flex flex-col gap-2">
                  <div>
                    <h1 className="font-semibold">Project</h1>
                    <h1>{task.project.name}</h1>
                  </div>

                  <div>
                    <h1 className="font-semibold">Dibuat Pada</h1>
                    <h1>{formatDate(task.created_at)}</h1>
                  </div>

                  <div>
                    <h1 className="font-semibold">Dibuat Oleh</h1>
                    <h1>{task.created_by_user?.name ?? "-"}</h1>
                  </div>

                  <div>
                    <h1 className="font-semibold">Terakhir Diperbarui Oleh</h1>
                    <h1>{task.updated_by_user?.name ?? "-"}</h1>
                  </div>

                  <div>
                    <h1 className="font-semibold">Status</h1>
                    <h1>{task.status?.label}</h1>
                  </div>
                </div>

                <div className="mt-3 flex gap-3 justify-center">
                  <NavigationButton
                    url={`/admin/projects/${task.project_id}/progress/${task.id}`}
                    label="Detail"
                  />
                  <NavigationButton
                    url={`/admin/projects/${task.project_id}/progress/edit-task/${task.id}`}
                    label="Update"
                    variant="default"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <h1 className="italic text-center text-muted-foreground">
              Task Kosong
            </h1>
          </CardContent>
        </Card>
      )}
    </>
  );
}
