import { TASK_REGISTRY } from "@/lib/workflow/task/registry";
import { ReactFlowTypes } from "@/types/global";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { NodeInput, NodeInputs } from "./node-input";
const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as ReactFlowTypes.NodeData;
  const task = TASK_REGISTRY[nodeData.type];
  console.log("task", task);
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput input={input} key={input.name} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";
export default NodeComponent;
