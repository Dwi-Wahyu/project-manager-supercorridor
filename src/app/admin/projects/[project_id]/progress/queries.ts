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
    whereClause["status"] = {
      id: input.status,
    };
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
    include: {
      status: {
        select: {
          label: true,
        },
      },
    },
  });

  const pageCount = Math.ceil(filtered / input.perPage);

  return { data, pageCount, filtered };
}

export async function getProjectStatusSummary(project_id: string) {
  const statusSummary = await prisma.taskStatus.findMany({
    select: {
      _count: {
        select: {
          tasks: {
            where: {
              project_id,
            },
          },
        },
      },
      label: true,
    },
  });

  return statusSummary;
}

export async function getTaskById(id: number) {
  return await prisma.task.findFirst({
    where: {
      id,
    },
    include: {
      status: {
        select: {
          label: true,
        },
      },
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
