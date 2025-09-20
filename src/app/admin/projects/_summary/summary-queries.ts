"use server";

import { Prisma, ProjectCategory } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { RegionalSummaryIdle, RegionalSummaryOccupancy } from "./type";

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

export async function getProjectBarChartData(
  year: string | undefined,
  category: ProjectCategory
) {
  type ProjectWhereClauseType = Prisma.ProjectWhereInput;
  let projectWhereClause: ProjectWhereClauseType = {
    category,
  };

  if (year) {
    projectWhereClause["year"] = year;
  }

  const regionals = await prisma.regional.findMany({
    include: {
      _count: {
        select: {
          projects: {
            where: {
              done: true,
              ...projectWhereClause,
            },
          },
        },
      },
      projects: {
        where: {
          done: false,
          ...projectWhereClause,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return regionals;
}

export async function getIdlePortData(category: ProjectCategory) {
  const regionalData = await prisma.regional.findMany({
    include: {
      projects: {
        where: {
          category,
        },
        select: {
          id: true,
          name: true,
          home_port: true,
          home_connected: true,
          year: true,
        },
      },
    },
  });

  const years: Record<string, Set<string>> = {};
  const total: Record<string, RegionalSummaryIdle> = {};

  regionalData.forEach((regional) => {
    if (!total[regional.id]) {
      total[regional.id] = { name: regional.name, years: {} };
    }

    regional.projects.forEach((project) => {
      const { year, home_port, home_connected } = project;

      const parsedYear = year?.toString() || "unknown";

      if (!years[parsedYear]) {
        years[parsedYear] = new Set();
      }
      years[parsedYear].add(regional.name);

      if (!total[regional.id].years[parsedYear]) {
        total[regional.id].years[parsedYear] = {
          home_port: 0,
          home_connected: 0,
          idle_port: 0,
        };
      }

      const idle_port =
        total[regional.id].years[parsedYear].home_port -
        total[regional.id].years[parsedYear].home_connected;

      total[regional.id].years[parsedYear].home_port += home_port ?? 0;
      total[regional.id].years[parsedYear].home_connected +=
        home_connected ?? 0;
      total[regional.id].years[parsedYear].idle_port = idle_port;
    });
  });

  const sortedYears = Object.keys(years).sort();

  return {
    data: total,
    sortedYears,
  };
}

export async function getOccupancyPortData(
  years: string[],
  category: ProjectCategory
) {
  const regionalData = await prisma.regional.findMany({
    include: {
      projects: {
        where: {
          category,
          year: {
            in: years.map((year) => year),
          },
        },
        select: {
          id: true,
          name: true,
          home_port: true,
          home_connected: true,
          year: true,
        },
      },
    },
  });

  const total: Record<string, RegionalSummaryOccupancy> = {};

  let home_port_total = 0;
  let home_connected_total = 0;
  let idle_port_total = 0;
  let ach_total = 0;

  regionalData.forEach((regional) => {
    if (!total[regional.id]) {
      total[regional.id] = {
        name: regional.name,
        home_connected: 0,
        home_port: 0,
        idle_port: 0,
        ach: 0,
      };
    }

    regional.projects.map((project, idx) => {
      const { home_port, home_connected } = project;

      const idle_port =
        total[regional.id].home_port - total[regional.id].home_connected;

      idle_port_total += idle_port;
      home_port_total += home_port ?? 0;
      home_connected_total += home_connected ?? 0;

      total[regional.id].home_port += home_port ?? 0;
      total[regional.id].home_connected += home_connected ?? 0;
      total[regional.id].idle_port =
        total[regional.id].home_port - total[regional.id].home_connected;
    });

    let ach = 0;

    if (total[regional.id].home_port > 0) {
      ach =
        (total[regional.id].home_connected / total[regional.id].home_port) *
        100;
    }

    total[regional.id].ach = ach;

    ach_total += ach;
  });

  return {
    total,
    home_port_total,
    home_connected_total,
    idle_port_total,
    ach_total,
  };
}
