"use client";

import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Handle,
  Position,
  type Connection,
  type EdgeChange,
  type NodeChange,
  type NodeProps,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

function CircuitNode({ data }: NodeProps<{ label: string }>) {
  return (
    <div className="glass-panel rounded-md min-w-[140px] relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white/70 !border-white/40 !h-2 !w-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white/70 !border-white/40 !h-2 !w-2"
      />
      <div className="px-2.5 py-1.5 border-b border-white/[0.06] bg-surface-container/30 flex items-center justify-between rounded-t-md">
        <span className="font-label-mono font-semibold text-on-surface text-[10px] tracking-wide">
          {data.label}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></span>
      </div>
      <div className="p-2.5">
        <div className="flex items-center gap-2 text-[9px] text-on-surface-variant font-label-mono">
          <span className="w-1.5 h-1.5 rounded-sm bg-white"></span>
          <span>IO Pins</span>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { circuit: CircuitNode };

export function CircuitCanvas() {
  const nodes = useWorkspaceStore((state) => state.nodes);
  const edges = useWorkspaceStore((state) => state.edges);
  const setNodes = useWorkspaceStore((state) => state.setNodes);
  const setEdges = useWorkspaceStore((state) => state.setEdges);
  const addNode = useWorkspaceStore((state) => state.addNode);
  const removeNode = useWorkspaceStore((state) => state.removeNode);
  const zoom = useWorkspaceStore((state) => state.zoom);
  const [flow, setFlow] = useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(applyNodeChanges(changes, nodes)),
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges(addEdge(connection, edges)),
    [edges, setEdges]
  );

  useEffect(() => {
    if (!flow) return;
    flow.setViewport({ x: 0, y: 0, zoom }, { duration: 200 });
  }, [flow, zoom]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setFlow}
        snapToGrid
        snapGrid={[16, 16]}
        panOnScroll
        fitView
        className="bg-transparent"
      >
        <Background color="var(--surface-variant)" gap={24} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          onClick={() =>
            addNode({
              id: `node-${Date.now()}`,
              type: "circuit",
              position: { x: 220, y: 220 },
              data: { label: "New Module" },
            })
          }
        >
          <span className="material-symbols-outlined text-[14px]">add</span>
          Add node
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const last = nodes[nodes.length - 1];
            if (last) {
              removeNode(last.id);
            }
          }}
        >
          <span className="material-symbols-outlined text-[14px]">remove</span>
          Remove last
        </Button>
      </div>
    </div>
  );
}
