"use client";
import create from "zustand";
import { persist } from "zustand/middleware";

export type GeneratedFile = {
  path: string;
  content: string;
};

type GlobalState = {
  projectPrompt: string;
  projectTitle: string;
  generatedFiles: GeneratedFile[];
  selectedView: string | null;
  aiMessages: string[];
  simulationState: Record<string, unknown>;
  setProjectPrompt: (p: string) => void;
  setProjectTitle: (t: string) => void;
  setGeneratedFiles: (files: GeneratedFile[]) => void;
  pushAiMessage: (m: string) => void;
  setSelectedView: (v: string | null) => void;
  setSimulationState: (s: Record<string, unknown>) => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      projectPrompt: "",
      projectTitle: "",
      generatedFiles: [],
      selectedView: null,
      aiMessages: [],
      simulationState: {},
      setProjectPrompt: (p) => set(() => ({ projectPrompt: p })),
      setProjectTitle: (projectTitle) => set(() => ({ projectTitle })),
      setGeneratedFiles: (generatedFiles) => set(() => ({ generatedFiles })),
      pushAiMessage: (m) =>
        set((state) => ({ aiMessages: [...state.aiMessages, m] })),
      setSelectedView: (selectedView) => set(() => ({ selectedView })),
      setSimulationState: (simulationState) =>
        set(() => ({ simulationState })),
    }),
    {
      name: "nova-global-store",
      partialize: (state) => ({
        projectPrompt: state.projectPrompt,
        projectTitle: state.projectTitle,
        generatedFiles: state.generatedFiles,
      }),
    },
  ),
);

export default useGlobalStore;
