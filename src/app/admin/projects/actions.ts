"use server";

import { errorResponse, successResponse } from "@/helper/action-helpers";
import { prisma } from "@/lib/prisma";
import { ServerActionReturn } from "@/types/server-action";
import {
  InputProjectSchemaType,
  UpdateProjectSchemaType,
} from "@/validations/schemas/project";
import { revalidatePath } from "next/cache";

export async function createProject(
  payload: InputProjectSchemaType
): Promise<ServerActionReturn<void>> {
  const { ...data } = payload;

  try {
    await prisma.project.create({
      data: {
        ...data,
      },
    });

    return successResponse(undefined, "Berhasil input project");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat input project",
      "SERVER_ERROR"
    );
  }
}

export async function updateProject(
  payload: UpdateProjectSchemaType
): Promise<ServerActionReturn<void>> {
  const { client_id, id, ...data } = payload;

  try {
    const prevData = await prisma.project.findFirst({
      where: { id },
    });

    if (!prevData) {
      return errorResponse("Project tidak ditemukan", "SERVER_ERROR");
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...data,
        client_id,
      },
    });

    return successResponse(undefined, "Berhasil update project");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat update project",
      "SERVER_ERROR"
    );
  }
}

export async function deleteProject(
  id: string
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");

    return successResponse(undefined, "Berhasil menghapus project");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat menghapus project",
      "SERVER_ERROR"
    );
  }
}
