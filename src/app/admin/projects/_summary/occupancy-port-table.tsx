"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getOccupancyPortData } from "./summary-queries";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SummaryTableLoading } from "./summary-table-loading";
import { ProjectCategory } from "@/app/generated/prisma";

type DataReturnType = Awaited<ReturnType<typeof getOccupancyPortData>>;

export function OccupancyPortTable({
  category,
}: {
  category: ProjectCategory;
}) {
  const [tableData, setTableData] = useState<DataReturnType | null>(null);

  const [years, setYears] = useState<string[]>(["2025", "2024"]);

  const fetchData = async () => {
    try {
      const data = await getOccupancyPortData(years, category);
      setTableData(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setTableData({
        total: {},
        ach_total: 0,
        home_connected_total: 0,
        home_port_total: 0,
        idle_port_total: 0,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [years]);

  function handleCheckYearFilter(year: string) {
    if (years.includes(year)) {
      setYears((prev) => prev.filter((value) => value !== year));
    } else {
      setYears((prev) => [...prev, year]);
    }
  }

  if (!tableData) {
    return <SummaryTableLoading title="OCCUPANCY PORT" />;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-lg font-bold ">OCCUPANCY PORT</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>Filter Tahun</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  checked={years.includes("2024")}
                  onCheckedChange={() => handleCheckYearFilter("2024")}
                >
                  2024
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={years.includes("2025")}
                  onCheckedChange={() => handleCheckYearFilter("2025")}
                >
                  2025
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={years.includes("2026")}
                  onCheckedChange={() => handleCheckYearFilter("2026")}
                >
                  2026
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-full table-auto border-collapse border border-slate-400">
              <TableHeader>
                <TableRow>
                  <TableHead
                    rowSpan={2}
                    className="border border-slate-300 text-center p-2 bg-gray-100"
                  >
                    REGIONAL
                  </TableHead>
                  <TableHead
                    colSpan={3}
                    className="border-slate-300 text-center"
                  >
                    JUMLAH PORT{" "}
                    {years.map((year, i) => (
                      <span key={i}>
                        {year} {i !== years.length - 1 && "& "}
                      </span>
                    ))}
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border border-slate-300 p-2 text-center bg-gray-100"
                  >
                    ACH
                  </TableHead>
                </TableRow>

                <TableRow>
                  <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                    HOME PORT
                  </TableHead>
                  <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                    HOME CONNECTED
                  </TableHead>
                  <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                    IDLE PORT
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(tableData.total).map((regional, idx) => {
                  const home_port = regional.home_port ?? 0;
                  const home_connected = regional.home_connected ?? 0;
                  const idle_port = regional.idle_port ?? 0;
                  const ach = regional.ach;

                  return (
                    <TableRow key={idx}>
                      <TableCell className="border text-center border-slate-300 p-2 font-semibold">
                        {regional.name}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {home_port}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {home_connected}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {idle_port}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {Number(ach).toFixed(0)} %
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-gray-200 font-bold">
                  <TableCell className="border text-center border-slate-300 p-2">
                    TOTAL
                  </TableCell>
                  <TableCell className="border border-slate-300 p-2 text-center">
                    {tableData.home_port_total}
                  </TableCell>
                  <TableCell className="border border-slate-300 p-2 text-center">
                    {tableData.home_connected_total}
                  </TableCell>
                  <TableCell className="border border-slate-300 p-2 text-center">
                    {tableData.idle_port_total}
                  </TableCell>
                  <TableCell className="border border-slate-300 p-2 text-center">
                    {Number(
                      tableData.ach_total /
                        Object.values(tableData.total).length
                    ).toFixed(0)}{" "}
                    %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
