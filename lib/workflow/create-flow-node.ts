import { ReactFlowTypes } from "@/types/global";

export function CreateFlowNode(
  nodeType: ReactFlowTypes.TaskType,
  position?: { x: number; y: number }
): ReactFlowTypes.AppNode {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    position: position || { x: 0, y: 0 },
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
  };
}
