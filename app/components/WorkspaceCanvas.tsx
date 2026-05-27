"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { AssemblyPanel } from "@/components/AssemblyPanel";
import { CircuitCanvas } from "@/components/CircuitCanvas";
import { CodeEditor } from "@/components/CodeEditor";
import { ComponentsPanel } from "@/components/ComponentsPanel";
import { FileTabs } from "@/components/FileTabs";
import { SimulationPanel } from "@/components/SimulationPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { DeviceSelector } from "@/components/DeviceSelector";
import { ZoomControls } from "@/components/ZoomControls";

export function WorkspaceCanvas() {
  const activeView = useWorkspaceStore((state) => state.activeView);

  return (
    <div className="flex-1 flex flex-col bg-surface border border-white/[0.06] rounded-lg overflow-hidden relative">
      <FileTabs />
      <div className="h-10 border-b border-white/[0.06] bg-surface/80 backdrop-blur flex items-center justify-between px-3 z-20">
        <div className="flex items-center gap-3">
          <h1 className="font-body-sm text-xs font-medium text-on-surface flex items-center gap-2">
            Build An Esp32 Controller One Split-flap Clock D
            <span className="px-1 py-0.5 rounded bg-surface-bright border border-white/[0.06] text-on-surface-variant font-label-mono text-[9px]">
              WIP
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DeviceSelector />
          <div className="h-3 w-px bg-white/[0.06] mx-1"></div>
          <ZoomControls />
        </div>
      </div>

      <div className="flex-1 w-full relative dot-grid overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeView === "code" && <CodeEditor />}
            {activeView === "diagram" && <CircuitCanvas />}
            {activeView === "components" && <ComponentsPanel />}
            {activeView === "simulation" && <SimulationPanel />}
            {activeView === "assembly" && <AssemblyPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      <TerminalPanel />
    </div>
  );
}
