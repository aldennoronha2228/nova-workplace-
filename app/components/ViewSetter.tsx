"use client";

import { useEffect } from "react";

import type { WorkspaceView } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function ViewSetter({ view }: { view: WorkspaceView }) {
  const setActiveView = useWorkspaceStore((state) => state.setActiveView);

  useEffect(() => {
    setActiveView(view);
  }, [setActiveView, view]);

  return null;
}
