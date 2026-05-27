"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function ZoomControls() {
  const zoom = useWorkspaceStore((state) => state.zoom);
  const setZoom = useWorkspaceStore((state) => state.setZoom);

  return (
    <div className="flex items-center gap-0.5">
      <button
        className="w-6 h-6 rounded hover:bg-surface-bright flex items-center justify-center text-on-surface-variant"
        onClick={() => setZoom(Math.max(0.5, Number((zoom - 0.1).toFixed(2))))}
      >
        <span className="material-symbols-outlined text-[14px]">remove</span>
      </button>
      <span className="font-label-mono text-on-surface-variant w-10 text-center">
        {Math.round(zoom * 100)}%
      </span>
      <button
        className="w-6 h-6 rounded hover:bg-surface-bright flex items-center justify-center text-on-surface-variant"
        onClick={() => setZoom(Math.min(2, Number((zoom + 0.1).toFixed(2))))}
      >
        <span className="material-symbols-outlined text-[14px]">add</span>
      </button>
      <div className="w-px h-3 bg-white/[0.06] mx-1"></div>
      <button className="w-6 h-6 rounded hover:bg-surface-bright flex items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined text-[14px]">pan_tool</span>
      </button>
    </div>
  );
}
