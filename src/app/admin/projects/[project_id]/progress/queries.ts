import { Prisma, TaskPriority, TaskStatus } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ProjectProgressSearchParamsType } from "@/validations/search-params/project-search-params";

export async function getProjectProgressData(
  input: ProjectProgressSearchParamsType
) {
  type WhereClause = Prisma.TaskWhereInput;
  let whereClause: WhereClause = {
    project_id: input.project_id,
  };

  if (input.name) {
    whereClause["name"] = {
      contains: input.name,
    };
  }

  if (input.status) {
    whereClause["status"] = input.status as TaskStatus;
  }

  if (input.priority) {
    whereClause["priority"] = input.priority as TaskPriority;
  }

  const filtered = await prisma.task.count({
    where: whereClause,
  });

  const data = await prisma.task.findMany({
    take: input.perPage,
    skip: (input.page - 1) * input.perPage,
    where: whereClause,
    orderBy: {
      created_at: "desc",
    },
  });

  const pageCount = Math.ceil(filtered / input.perPage);

  return { data, pageCount, filtered };
}

export async function getProjectStatusSummary(project_id: string) {
  const done = await prisma.task.count({
    where: {
      project_id,
      status: "done",
    },
  });

  const progress = await prisma.task.count({
    where: {
      project_id,
      status: "progress",
    },
  });

  const stuck = await prisma.task.count({
    where: {
      project_id,
      status: "stuck",
    },
  });

  const survey = await prisma.task.count({
    where: {
      project_id,
      status: "survey",
    },
  });

  return { done, progress, stuck, survey };
}

export async function getTaskById(id: number) {
  return await prisma.task.findFirst({
    where: {
      id,
    },
    include: {
      users_in_charge: {
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
        },
      },
      updated_by_user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
