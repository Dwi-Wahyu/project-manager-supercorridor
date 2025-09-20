"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment, useEffect, useState } from "react";
import { ProjectSummary } from "./type";
import { getIdlePortData } from "./summary-queries";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SummaryTableLoading } from "./summary-table-loading";
import { ProjectCategory } from "@/app/generated/prisma";

type DataReturnType = Awaited<ReturnType<typeof getIdlePortData>>;

export function IdlePortTable({ category }: { category: ProjectCategory }) {
  const [chartData, setChartData] = useState<DataReturnType | null>(null);

  const [years, setYears] = useState<string[]>(["2025", "2024"]);

  const fetchData = async () => {
    try {
      const data = await getIdlePortData(category);
      setChartData(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setChartData({ data: {}, sortedYears: [] });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!chartData) {
    return <SummaryTableLoading title="IDLE PORT" />;
  }

  const { data, sortedYears } = chartData;

  const filteredYears = sortedYears.filter((year) => years.includes(year));

  const totalSummary: Record<string, ProjectSummary> = {};

  filteredYears.forEach((year) => {
    totalSummary[year] = {
      home_port: 0,
      home_connected: 0,
      idle_port: 0,
    };
  });

  Object.values(data).forEach((regional) => {
    filteredYears.forEach((year) => {
      if (regional.years[year]) {
        totalSummary[year].home_port += regional.years[year].home_port;
        totalSummary[year].home_connected +=
          regional.years[year].home_connected;
        totalSummary[year].idle_port += regional.years[year].idle_port;
      }
    });
  });

  function handleCheckYearFilter(year: string) {
    if (years.includes(year)) {
      setYears((prev) => prev.filter((value) => value !== year));
    } else {
      setYears((prev) => [...prev, year]);
    }
  }

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-lg font-bold ">IDLE PORT</h1>

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
                    className="border text-center border-slate-300 p-2 bg-gray-100"
                  >
                    REGIONAL
                  </TableHead>
                  {filteredYears.map((year) => (
                    <TableHead
                      key={year}
                      colSpan={3}
                      className="border text-center border-slate-300 p-2 bg-gray-100"
                    >
                      {year}
                    </TableHead>
                  ))}
                </TableRow>
                <TableRow>
                  {filteredYears.map((year) => (
                    <Fragment key={year}>
                      <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                        HOME PORT
                      </TableHead>
                      <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                        HOME CONNECTED
                      </TableHead>
                      <TableHead className="border border-slate-300 p-2 text-center bg-gray-50">
                        IDLE PORT
                      </TableHead>
                    </Fragment>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(data).map((regional, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="border text-center border-slate-300 p-2 font-semibold">
                      {regional.name}
                    </TableCell>
                    {filteredYears.map((year) => (
                      <Fragment key={year}>
                        <TableCell className="border border-slate-300 p-2 text-center">
                          {regional.years[year]?.home_port ?? 0}
                        </TableCell>
                        <TableCell className="border border-slate-300 p-2 text-center">
                          {regional.years[year]?.home_connected ?? 0}
                        </TableCell>
                        <TableCell className="border border-slate-300 p-2 text-center">
                          {regional.years[year]?.idle_port ?? 0}
                        </TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="bg-gray-200 font-bold">
                  <TableCell className="border text-center border-slate-300 p-2">
                    TOTAL
                  </TableCell>
                  {filteredYears.map((year) => (
                    <Fragment key={year}>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {totalSummary[year].home_port}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {totalSummary[year].home_connected}
                      </TableCell>
                      <TableCell className="border border-slate-300 p-2 text-center">
                        {totalSummary[year].idle_port}
                      </TableCell>
                    </Fragment>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
