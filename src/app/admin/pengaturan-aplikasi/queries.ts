"server only";

import { prisma } from "@/lib/prisma";

export async function getRegionals() {
  return await prisma.regional.findMany({
    include: {
      projects: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function getTaskStatus() {
  return await prisma.taskStatus.findMany({
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  });
}
