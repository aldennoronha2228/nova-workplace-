"use client";

import { useEffect, type ReactNode } from "react";

import { AIAssistant } from "@/components/AIAssistant";
import { SidebarExplorer } from "@/components/SidebarExplorer";
import { TopNavbar } from "@/components/TopNavbar";
import { WorkspaceCanvas } from "@/components/WorkspaceCanvas";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function AppShell({ children }: { children?: ReactNode }) {
  useEffect(() => {
    useWorkspaceStore.persist.rehydrate();
  }, []);

  return (
    <div className="relative bg-background text-on-surface font-body-sm overflow-hidden h-screen w-screen flex flex-col">
      <TopNavbar />
      <div className="flex-1 flex w-full p-2 gap-2 h-[calc(100vh-56px)]">
        <SidebarExplorer />
        <WorkspaceCanvas />
        <AIAssistant />
      </div>
      {children ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {children}
        </div>
      ) : null}
    </div>
  );
}
