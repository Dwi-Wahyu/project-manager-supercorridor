"server only";

import { Prisma } from "@/app/generated/prisma";
import { auth } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { ClientSearchParamsType } from "@/validations/search-params/client-search-params";

export async function getClientData(input: ClientSearchParamsType) {
  type WhereClause = Prisma.ClientWhereInput;
  let whereClause: WhereClause = {};

  const session = await auth();

  if (!session) {
    return { data: [], pageCount: 1, filtered: [] };
  }

  if (input.name) {
    whereClause["name"] = {
      contains: input.name,
    };
  }

  const filtered = await prisma.client.count({
    where: whereClause,
  });

  const data = await prisma.client.findMany({
    take: input.perPage,
    skip: (input.page - 1) * input.perPage,
    where: whereClause,
    include: {
      projects: {
        include: {
          _count: true,
        },
      },
    },
  });

  const pageCount = Math.ceil(filtered / input.perPage);

  return { data, pageCount, filtered };
}

export async function getAllClient() {
  return await prisma.client.findMany();
}

export async function getClientSum() {
  return await prisma.client.count();
}
