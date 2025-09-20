import { PageTitle } from "@/app/_components/page-title";
import UnauthorizedPage from "@/app/_components/unauthorized-page";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/config/auth";
import { TaskAndaClient } from "./task-anda-client";
import { getWorkerTasks } from "./queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTaskStatus } from "../pengaturan-aplikasi/queries";
import { SearchParams } from "nuqs";
import { ProjectProgressSearchParams } from "@/validations/search-params/project-search-params";
import { Suspense } from "react";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function YourTaskPage(props: IndexPageProps) {
  const session = await auth();

  const searchParams = await props.searchParams;
  const search = ProjectProgressSearchParams.parse(searchParams);

  if (!session) {
    return <UnauthorizedPage />;
  }

  let updatedSearch = {
    ...search,
    worker_id: session.user.id,
  };

  const workerTasks = await getWorkerTasks(updatedSearch);
  const taskStatus = await getTaskStatus();

  return (
    <div className="flex flex-col gap-y-5">
      <Card className="border-t-2 border-primary">
        <CardContent className="text-center">
          <PageTitle title="Task Anda" />
        </CardContent>
      </Card>

      <Suspense fallback={<TaskAndaSkeleton />}>
        <TaskAndaClient workerTasks={workerTasks} taskStatus={taskStatus} />
      </Suspense>
    </div>
  );
}

function TaskAndaSkeleton() {
  return (
    <>
      <Card>
        <CardContent>
          <h1 className="font-semibold mb-3">Filter</h1>

          <div className="flex justify-between gap-4">
            <Input disabled placeholder="Cari Nama Task" className="w-fit" />

            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"status"}>Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </>
  );
}
