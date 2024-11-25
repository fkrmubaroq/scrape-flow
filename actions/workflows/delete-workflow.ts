"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "../utils";

export async function DeleteWorkflow(id: string) {

  const userId = await getCurrentUserId();

  await prisma.workflow.delete({
    where: {
      id,
      userId
    }
  })

  revalidatePath("/workflows")
}