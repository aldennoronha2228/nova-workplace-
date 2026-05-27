"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";
import type { TerminalTab } from "@/types/workspace";

const tabs: { id: TerminalTab; label: string }[] = [
  { id: "build", label: "Build" },
  { id: "serial", label: "Serial" },
  { id: "debug", label: "Debug" },
  { id: "ai", label: "AI Logs" },
];

export function TerminalPanel() {
  const terminalTab = useWorkspaceStore((state) => state.terminalTab);
  const setTerminalTab = useWorkspaceStore((state) => state.setTerminalTab);
  const terminalLogs = useWorkspaceStore((state) => state.terminalLogs);
  const clearTerminal = useWorkspaceStore((state) => state.clearTerminal);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeLog = terminalLogs.find((log) => log.tab === terminalTab);
  const statusColor =
    activeLog?.status === "success"
      ? "bg-emerald-400"
      : activeLog?.status === "error"
      ? "bg-red-400"
      : activeLog?.status === "running"
      ? "bg-amber-400"
      : "bg-white/30";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeLog?.lines]);

  return (
    <div className="border-t border-white/[0.06] bg-surface-container/70 resize-y overflow-auto">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTerminalTab(tab.id)}
              className={cn(
                "text-[10px] font-label-mono uppercase tracking-wider px-2 py-1 rounded",
                terminalTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", statusColor)}></span>
          <span className="text-[10px] text-on-surface-variant">
            {activeLog?.status ?? "idle"}
          </span>
          <Button size="sm" variant="ghost" onClick={() => clearTerminal(terminalTab)}>
            Clear
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="max-h-40 overflow-y-auto px-3 pb-3 font-label-mono text-[10px] text-on-surface-variant space-y-1"
      >
        {activeLog?.lines.length ? (
          activeLog.lines.map((line, index) => <div key={index}>{line}</div>)
        ) : (
          <div className="text-on-surface-variant">No logs yet.</div>
        )}
      </div>
    </div>
  );
}
