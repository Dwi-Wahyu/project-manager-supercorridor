"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProjectBarChartData } from "./summary-queries";
import { ProjectCategory } from "@/app/generated/prisma";

type ChartData = {
  regional: string;
  done: number;
  ongoing: number;
};

export function ProjectBarChart({ category }: { category: ProjectCategory }) {
  const [year, setYear] = useState<string | undefined>("2025");
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const chartConfig = {
    ongoing: {
      label: "On Going",
      color: "var(--chart-1)",
    },
    done: {
      label: "Selesai",
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  async function fetchData() {
    const data = await getProjectBarChartData(year, category);

    setChartData(
      data.map((value) => ({
        regional: value.name,
        done: value._count.projects,
        ongoing: value.projects.length,
      }))
    );
  }

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <Card className="text-center">
      <CardHeader className="flex justify-between items-center">
        <h1 className="font-semibold text-lg leading-tight">
          Statistik Project Regional
        </h1>

        <div className="">
          <Select
            defaultValue="2025"
            value={year}
            onValueChange={(value) => setYear(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["2024", "2025", "2026"].map((year, idx) => (
                <SelectItem key={idx} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="regional"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="ongoing"
              stackId="a"
              fill="var(--color-ongoing)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="done"
              stackId="a"
              fill="var(--color-done)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
