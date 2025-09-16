"use server";

import { errorResponse, successResponse } from "@/helper/action-helpers";
import { prisma } from "@/lib/prisma";
import { ServerActionReturn } from "@/types/server-action";
import {
  InputTaskSchemaType,
  UpdateTaskSchemaType,
} from "@/validations/schemas/task";
import { revalidatePath } from "next/cache";
import { getTaskById } from "./queries";

export async function createTask(
  payload: InputTaskSchemaType
): Promise<ServerActionReturn<void>> {
  const { users_in_charge, ...data } = payload;

  try {
    await prisma.task.create({
      data: {
        ...data,
        users_in_charge: {
          connect: users_in_charge.map((user) => ({ id: user.value })),
        },
      },
    });

    return successResponse(undefined, "Berhasil input task");
  } catch (error) {
    return errorResponse("Terjadi kesalahan saat input task", "SERVER_ERROR");
  }
}

export async function updateTask(
  payload: UpdateTaskSchemaType
): Promise<ServerActionReturn<void>> {
  const { users_in_charge, last_updated_by_user_id, id, ...data } = payload;

  try {
    const prevTask = await prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        users_in_charge: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!prevTask) {
      return errorResponse("Task tidak ditemukan", "SERVER_ERROR");
    }

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...data,
        users_in_charge: {
          disconnect: prevTask.users_in_charge.map((user) => ({ id: user.id })),
          connect: users_in_charge.map((user) => ({ id: user.value })),
        },
        updated_by_user_id: last_updated_by_user_id,
      },
    });

    return successResponse(undefined, "Berhasil input task");
  } catch (error) {
    return errorResponse("Terjadi kesalahan saat input task", "SERVER_ERROR");
  }
}

export async function deleteTask(
  id: number
): Promise<ServerActionReturn<void>> {
  try {
    const task = await getTaskById(id);

    if (!task) {
      return errorResponse("Task tidak ditemukan", "SERVER_ERROR");
    }

    await prisma.task.delete({
      where: { id },
    });

    revalidatePath("/admin/projects/" + task.project_id);

    return successResponse(undefined, "Berhasil menghapus task");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat menghapus task",
      "SERVER_ERROR"
    );
  }
}
