"use server";

import { WORKFLOW_STATUS } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { createWorkflowSchema } from "@/schema/workflow";
import { WorkflowSchema } from "@/types/global";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: WorkflowSchema.CreateWorkflow) {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) {
      throw new Error("Invalid form data");
    }

    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WORKFLOW_STATUS.Draft,
        definition: "TODO",
        ...data,
      },
    });

    if (!result) {
      throw new Error("Failed to create workflow");
    }

  redirect(`/workflow/editor/${result.id}`);
}
