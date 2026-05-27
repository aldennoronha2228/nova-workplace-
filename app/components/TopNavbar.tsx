"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import type { WorkspaceView } from "@/types/workspace";

const viewTabs: { id: WorkspaceView; label: string; icon: string }[] = [
  { id: "code", label: "Code", icon: "code" },
  { id: "diagram", label: "Circuit Diagram", icon: "account_tree" },
  { id: "components", label: "Components", icon: "extension" },
  { id: "simulation", label: "Simulation", icon: "play_circle" },
  { id: "assembly", label: "Assembly", icon: "build" },
];

export function TopNavbar() {
  const router = useRouter();
  const params = useParams();
  const activeView = useWorkspaceStore((state) => state.activeView);
  const setActiveView = useWorkspaceStore((state) => state.setActiveView);

  const projectId = useMemo(() => {
    return typeof params?.projectId === "string" ? params.projectId : "project-alpha";
  }, [params]);

  return (
    <nav className="bg-surface-container/95 backdrop-blur-md border-b border-white/[0.04] flex items-center justify-between px-6 h-12 flex-shrink-0 relative">
      <div className="flex items-center gap-4 w-48">
        <span
          className="material-symbols-outlined text-white text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          memory
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-on-surface text-[16px] tracking-tight">
            CircuitEngine
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-label-mono text-[9px] uppercase tracking-wider">
            Beta
          </span>
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center bg-surface-container-highest/80 border border-white/[0.06] rounded-full px-2 py-0.5 shadow-sm gap-1">
          {viewTabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveView(tab.id);
                  router.push(`/workspace/${projectId}/${tab.id}`);
                }}
                className={`relative px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-white"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="view-tab"
                    className="absolute inset-0 rounded-full bg-white/8 border border-white/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="material-symbols-outlined text-[13px] relative z-10">
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 w-48 justify-end">
        <button className="w-8 h-8 rounded hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
        <button className="w-7 h-7 rounded hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[18px]">cloud_done</span>
        </button>
        <div className="w-px h-4 bg-white/[0.04] mx-2"></div>
        <button className="w-8 h-8 rounded-full bg-surface-bright border border-white/[0.06] flex items-center justify-center text-on-surface text-[11px] font-medium overflow-hidden">
          JD
        </button>
      </div>
    </nav>
  );
}
