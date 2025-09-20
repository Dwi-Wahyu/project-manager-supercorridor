"use server";

import { errorResponse, successResponse } from "@/helper/action-helpers";
import { prisma } from "@/lib/prisma";
import { ServerActionReturn } from "@/types/server-action";
import { UpsertRegionalSchemaType } from "@/validations/schemas/regional";
import { UpsertTaskStatusSchemaType } from "@/validations/schemas/task";
import { revalidatePath } from "next/cache";

export async function upsertRegional(
  payload: UpsertRegionalSchemaType
): Promise<ServerActionReturn<void>> {
  const { id, name } = payload;

  try {
    await prisma.regional.upsert({
      where: {
        id,
      },
      update: {
        name: name,
      },
      create: {
        name: name,
      },
    });

    revalidatePath("/admin/pengaturan-aplikasi");

    return successResponse(undefined, "Berhasil menyimpan regional");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat menyimpan regional",
      "SERVER_ERROR"
    );
  }
}

export async function upsertTaskStatus(
  payload: UpsertTaskStatusSchemaType
): Promise<ServerActionReturn<void>> {
  const { id, label } = payload;

  try {
    await prisma.taskStatus.upsert({
      where: {
        id,
      },
      update: {
        label: label,
      },
      create: {
        label: label,
      },
    });

    revalidatePath("/admin/pengaturan-aplikasi");

    return successResponse(undefined, "Berhasil menyimpan status task");
  } catch (error) {
    console.log(error);

    return errorResponse(
      "Terjadi kesalahan saat menyimpan status task",
      "SERVER_ERROR"
    );
  }
}

export async function deleteRegional(
  id: string
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.regional.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/pengaturan-aplikasi");

    return successResponse(undefined, "Berhasil menghapus regional");
  } catch (error) {
    console.log(error);

    return errorResponse(
      "Terjadi kesalahan saat menghapus regional",
      "SERVER_ERROR"
    );
  }
}

export async function deleteTaskStatus(
  id: string
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.taskStatus.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/pengaturan-aplikasi");

    return successResponse(undefined, "Berhasil menghapus status");
  } catch (error) {
    console.log(error);

    return errorResponse(
      "Terjadi kesalahan saat menghapus status task",
      "SERVER_ERROR"
    );
  }
}
