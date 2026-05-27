"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";

export function FileTabs() {
  const openTabs = useWorkspaceStore((state) => state.openTabs);
  const activeFileId = useWorkspaceStore((state) => state.activeFileId);
  const setActiveFile = useWorkspaceStore((state) => state.setActiveFile);
  const closeFile = useWorkspaceStore((state) => state.closeFile);

  if (!openTabs.length) {
    return (
      <div className="h-9 border-b border-white/[0.06] bg-surface-container/60 flex items-center px-3 text-xs text-on-surface-variant">
        No files open
      </div>
    );
  }

  return (
    <div className="h-9 border-b border-white/[0.06] bg-surface-container/60 flex items-center gap-1 px-2">
      {openTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFile(tab.id)}
          className={cn(
            "group flex items-center gap-2 rounded px-2 py-1 text-xs font-label-mono text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/60",
            activeFileId === tab.id && "bg-white/10 text-white"
          )}
        >
          <span>{tab.name}</span>
          <span
            onClick={(event) => {
              event.stopPropagation();
              closeFile(tab.id);
            }}
            className="material-symbols-outlined text-[14px] opacity-60 group-hover:opacity-100"
          >
            close
          </span>
        </button>
      ))}
    </div>
  );
}
