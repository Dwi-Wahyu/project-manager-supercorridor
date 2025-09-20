"server only";

import { Prisma, ProjectCategory } from "@/app/generated/prisma";
import { auth } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { ProjectSearchParamsType } from "@/validations/search-params/project-search-params";
import { getRegionals } from "../pengaturan-aplikasi/queries";
import { ChartConfig } from "@/components/ui/chart";
import { SummarySearchParamsType } from "@/validations/search-params/summary-search-params";

export async function getProjectData(input: ProjectSearchParamsType) {
  type WhereClause = Prisma.ProjectWhereInput;
  let whereClause: WhereClause = {};

  if (input.name) {
    whereClause["name"] = {
      contains: input.name,
    };
  }

  if (input.category) {
    whereClause["category"] = input.category as ProjectCategory;
  }

  if (input.year) {
    whereClause["year"] = input.year;
  }

  const filtered = await prisma.project.count({
    where: whereClause,
  });

  const data = await prisma.project.findMany({
    take: input.perPage,
    skip: (input.page - 1) * input.perPage,
    where: whereClause,
    orderBy: {
      created_at: "desc",
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
      task: {
        select: {
          id: true,
        },
      },
      regional: {
        select: {
          name: true,
        },
      },
    },
  });

  const pageCount = Math.ceil(filtered / input.perPage);

  return { data, pageCount, filtered };
}

export async function getProjectById(id: string) {
  return await prisma.project.findFirst({
    where: { id },
    include: {
      client: true,
      regional: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getProjectSum() {
  return await prisma.project.count();
}
