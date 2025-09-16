"server only";

import { Prisma } from "@/app/generated/prisma";
import { auth } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { MaterialSearchParamsType } from "@/validations/search-params/material-search-params";

export async function getMaterialData(input: MaterialSearchParamsType) {
  type WhereClause = Prisma.MaterialWhereInput;
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

  const filtered = await prisma.material.count({
    where: whereClause,
  });

  const data = await prisma.material.findMany({
    take: input.perPage,
    skip: (input.page - 1) * input.perPage,
    where: whereClause,
  });

  const pageCount = Math.ceil(filtered / input.perPage);

  return { data, pageCount, filtered };
}

export async function getAllMaterial() {
  return await prisma.material.findMany();
}

export async function getMaterialSum() {
  return await prisma.material.count();
}
