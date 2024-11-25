"use server";

import { handleResponseError } from "@/lib/errors";
import prisma from "@/lib/prisma";
import { ServerAction } from "@/types/global";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowsForUser(){
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const data: ServerAction.GetWorkflowsForUser[] =
      await prisma.workflow.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    return {
      data,
      error: null
    };
  } catch (e: unknown) {
    return handleResponseError(e);
  }
}
