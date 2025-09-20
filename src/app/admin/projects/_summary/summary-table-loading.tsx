import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SummaryTableLoading({ title }: { title: string }) {
  return (
    <Card>
      <CardContent>
        <h1 className="text-lg font-bold ">{title}</h1>

        <div className="mt-4 flex gap-2">
          <Skeleton className="w-1/3 h-20 " />
          <div className="w-1/3 flex flex-col gap-2">
            <Skeleton className="w-full h-10" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
          </div>
          <Skeleton className="w-1/3 h-20" />
        </div>
        <div className="grid mt-3 grid-cols-4 gap-3">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="grid mt-3 grid-cols-4 gap-3">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="grid mt-3 grid-cols-4 gap-3">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <Skeleton className="w-full h-10 mt-3" />
      </CardContent>
    </Card>
  );
}
