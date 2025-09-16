"use server";

import { errorResponse, successResponse } from "@/helper/action-helpers";
import { prisma } from "@/lib/prisma";
import { ServerActionReturn } from "@/types/server-action";
import {
  InputMaterialSchemaType,
  UpdateMaterialSchemaType,
} from "@/validations/schemas/material";
import { revalidatePath } from "next/cache";

export async function createMaterial(
  payload: InputMaterialSchemaType
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.material.create({
      data: payload,
    });

    revalidatePath("/admin/materials");

    return successResponse(undefined, "Berhasil input material");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat input material",
      "SERVER_ERROR"
    );
  }
}

export async function updateMaterial(
  payload: UpdateMaterialSchemaType
): Promise<ServerActionReturn<void>> {
  const { id, ...data } = payload;

  try {
    await prisma.material.update({
      where: {
        id,
      },
      data: data,
    });

    return successResponse(undefined, "Berhasil input material");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat input material",
      "SERVER_ERROR"
    );
  }
}

export async function deleteMaterial(
  id: number
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.material.delete({
      where: { id },
    });

    revalidatePath("/admin/materials");

    return successResponse(undefined, "Berhasil menghapus material");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat menghapus material",
      "SERVER_ERROR"
    );
  }
}
