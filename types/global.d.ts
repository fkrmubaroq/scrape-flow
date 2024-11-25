import { TASK_PARAM_TYPE, TASK_TYPE } from "@/lib/constant";
import { Workflow } from "@prisma/client";
import { Node } from "@xyflow/react";
import React, { ReactNode } from "react";
import { z } from "zod";
import { createWorkflowSchema } from "../schema/workflow";

declare namespace ServerAction {
  type ResultError = {
    error: string;
  };

  type GetWorkflowsForUser = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    definition: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

declare namespace WorkflowSchema {
  type CreateWorkflow = z.infer<typeof createWorkflowSchema>;
}

declare namespace WorkflowFeature {
  type TooltipWrapperProps = {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
  };

  type DeleteWorkflowDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: Workflow;
  };
}

export declare namespace ReactFlowTypes {

  type TaskType = typeof TASK_TYPE[keyof typeof TASK_TYPE];

  type NodeData = {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: any;
  };

  type AppNode = Node & {
    data: NodeData;
  };

  type NodeHeaderProps = {
    taskType: TaskType;
  }

  type TaskParam = {
    name: string;
    type: keyof typeof TASK_PARAM_TYPE;
    helperText?: string | React.ReactNode;
    required?: boolean;
    placeholder?: string;
    hideHandle?: boolean;
    value?: string;
    [key: string]: any
  }
}
