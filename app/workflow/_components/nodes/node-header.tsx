"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TASK_REGISTRY } from "@/lib/workflow/task/registry";
import { ReactFlowTypes } from "@/types/global";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";

export default function NodeHeader({
  taskType,
}: ReactFlowTypes.NodeHeaderProps) {
  const task = TASK_REGISTRY[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="tet-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
