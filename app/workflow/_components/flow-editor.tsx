"use client";

import { TASK_TYPE } from "@/lib/constant";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";

const nodeTypes = {
  Node: NodeComponent,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2}
export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TASK_TYPE.LaunchBrowser),
  ]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  return (
    <main className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgeChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        snapToGrid
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions}/>
        <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
      </ReactFlow>
    </main>
  );
}
