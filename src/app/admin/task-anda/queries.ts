"server only";

import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ProjectProgressSearchParamsType } from "@/validations/search-params/project-search-params";

export async function getWorkerTasks(input: ProjectProgressSearchParamsType) {
  type WhereClause = Prisma.TaskWhereInput;
  let whereClause: WhereClause = {
    users_in_charge: {
      some: {
        id: input.worker_id,
      },
    },
  };

  if (input.status) {
    whereClause["status_id"] = input.status;
  }

  return await prisma.task.findMany({
    where: whereClause,
    include: {
      updated_by_user: {
        select: {
          name: true,
        },
      },
      created_by_user: {
        select: {
          name: true,
        },
      },
      project: {
        select: {
          name: true,
        },
      },
      status: {
        select: {
          label: true,
        },
      },
    },
  });
}
