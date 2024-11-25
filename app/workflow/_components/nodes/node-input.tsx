import { cn } from "@/lib/utils";
import { ReactFlowTypes } from "@/types/global";
import { Handle, Position } from "@xyflow/react";
import NodeParamField from "./node-param-field";

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({ input }: { input: ReactFlowTypes.TaskParam }) {
  return (
    <div className="fflex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground border-2 border-background !size-4"
          )}
        />
      )}
    </div>
  );
}
