"server only";

import { Prisma, ProjectCategory } from "@/app/generated/prisma";
import { auth } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { ProjectSearchParamsType } from "@/validations/search-params/project-search-params";

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
    },
  });
}

export async function getProjectGroupByYear() {
  return await prisma.project.groupBy({
    by: "year",
  });
}

export async function getProjectGroupByStatus() {
  return await prisma.project.groupBy({
    by: "status",
  });
}

export async function getOnGoingProjectGroupByRegional() {
  const regional = await prisma.project.groupBy({
    by: "regional",
  });

  console.log(regional);
}

export async function getProjectsSummary(category: ProjectCategory) {
  const total = await prisma.project.findMany({
    where: {
      category,
    },
    select: {
      home_port: true,
      home_connected: true,
    },
  });

  const onGoing = await prisma.project.findMany({
    where: {
      category,
      done: false,
    },
    select: {
      home_port: true,
      home_connected: true,
    },
  });

  const done = await prisma.project.findMany({
    where: {
      category,
      done: true,
    },
    select: {
      home_port: true,
      home_connected: true,
    },
  });

  return {
    total: {
      sum: total.length,
      port: total.reduce((accumulator, currentProject) => {
        return accumulator + (currentProject.home_port || 0);
      }, 0),
    },
    onGoing: {
      sum: onGoing.length,
      port: onGoing.reduce((accumulator, currentProject) => {
        return accumulator + (currentProject.home_port || 0);
      }, 0),
    },
    done: {
      sum: done.length,
      port: done.reduce((accumulator, currentProject) => {
        return accumulator + (currentProject.home_port || 0);
      }, 0),
    },
  };
}

export async function getProjectSum() {
  return await prisma.project.count();
}
