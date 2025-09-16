"use server";

import { errorResponse, successResponse } from "@/helper/action-helpers";
import { prisma } from "@/lib/prisma";
import { ServerActionReturn } from "@/types/server-action";
import {
  InputClientSchemaType,
  UpdateClientSchemaType,
} from "@/validations/schemas/client";
import { revalidatePath } from "next/cache";

export async function createClient(
  payload: InputClientSchemaType
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.client.create({
      data: payload,
    });

    revalidatePath("/admin/clients");

    return successResponse(undefined, "Berhasil input client");
  } catch (error) {
    console.log(error);

    return errorResponse("Terjadi kesalahan saat input client", "SERVER_ERROR");
  }
}

export async function updateClient(
  payload: UpdateClientSchemaType
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.client.update({
      where: {
        id: payload.id,
      },
      data: {
        name: payload.name,
      },
    });

    revalidatePath("/admin/clients");

    return successResponse(undefined, "Berhasil edit client");
  } catch (error) {
    console.log(error);

    return errorResponse("Terjadi kesalahan saat edit client", "SERVER_ERROR");
  }
}

export async function deleteClient(
  id: string
): Promise<ServerActionReturn<void>> {
  try {
    await prisma.client.delete({
      where: { id },
    });

    revalidatePath("/admin/clients");

    return successResponse(undefined, "Berhasil menghapus client");
  } catch (error) {
    return errorResponse(
      "Terjadi kesalahan saat menghapus client",
      "SERVER_ERROR"
    );
  }
}
