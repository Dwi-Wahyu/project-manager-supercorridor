"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { regional: "jateng", sum: 275, fill: "var(--color-jateng)" },
  { regional: "jabar", sum: 200, fill: "var(--color-jabar)" },
  { regional: "banten", sum: 187, fill: "var(--color-banten)" },
  { regional: "sulsel", sum: 173, fill: "var(--color-sulsel)" },
  { regional: "jatim", sum: 90, fill: "var(--color-jatim)" },
];

const chartConfig = {
  sum: {
    label: "Jumlah",
  },
  jateng: {
    label: "Jateng",
    color: "var(--chart-1)",
  },
  jabar: {
    label: "Jabar",
    color: "var(--chart-2)",
  },
  banten: {
    label: "Banten",
    color: "var(--chart-3)",
  },
  sulsel: {
    label: "Sulsel",
    color: "var(--chart-4)",
  },
  jatim: {
    label: "Jatim",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ProjectSelesaiPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Selesai</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="sum" />
            <ChartLegend
              content={<ChartLegendContent nameKey="regional" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
