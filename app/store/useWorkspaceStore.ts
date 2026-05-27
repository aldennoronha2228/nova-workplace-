import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Edge, Node } from "reactflow";
import type {
  ChatMessage,
  FileNode,
  FileTab,
  TerminalLog,
  TerminalTab,
  WorkspaceView,
} from "@/types/workspace";
import {
  defaultTabs,
  fileContents,
  initialChat,
  initialEdges,
  initialNodes,
  projectTree,
  terminalLogs,
} from "@/data/mockData";
import { devices } from "@/data/mockData";

const safeStorage = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  return localStorage;
};

export type WorkspaceState = {
  activeView: WorkspaceView;
  setActiveView: (view: WorkspaceView) => void;
  projectTree: FileNode[];
  addFile: (folderId: string, file: FileNode) => void;
  openTabs: FileTab[];
  activeFileId: string;
  openFile: (file: FileTab) => void;
  closeFile: (id: string) => void;
  setActiveFile: (id: string) => void;
  expandedFolders: Record<string, boolean>;
  toggleFolder: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  fileContents: Record<string, string>;
  updateFileContent: (path: string, content: string) => void;
  selectedDeviceId: string;
  setSelectedDeviceId: (id: string) => void;
  selectedComponentIds: string[];
  toggleSelectedComponent: (id: string) => void;
  simulationStatus: "idle" | "running" | "paused";
  setSimulationStatus: (status: "idle" | "running" | "paused") => void;
  zoom: number;
  setZoom: (value: number) => void;
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  updateChatMessage: (id: string, content: string) => void;
  terminalTab: TerminalTab;
  setTerminalTab: (tab: TerminalTab) => void;
  terminalLogs: TerminalLog[];
  clearTerminal: (tab: TerminalTab) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      activeView: "diagram",
      setActiveView: (view) => set({ activeView: view }),
      projectTree,
      addFile: (folderId, file) =>
        set((state) => ({
          projectTree: state.projectTree.map((node) => {
            if (node.id !== folderId || node.type !== "folder") return node;
            const nextChildren = node.children ? [...node.children, file] : [file];
            return { ...node, children: nextChildren };
          }),
        })),
      openTabs: defaultTabs,
      activeFileId: defaultTabs[0]?.id ?? "",
      openFile: (file) => {
        const existing = get().openTabs.find((tab) => tab.id === file.id);
        if (existing) {
          set({ activeFileId: existing.id });
          return;
        }
        set((state) => ({
          openTabs: [...state.openTabs, file],
          activeFileId: file.id,
        }));
      },
      closeFile: (id) => {
        set((state) => {
          const nextTabs = state.openTabs.filter((tab) => tab.id !== id);
          const nextActive =
            state.activeFileId === id && nextTabs.length
              ? nextTabs[nextTabs.length - 1].id
              : state.activeFileId === id
              ? ""
              : state.activeFileId;
          return { openTabs: nextTabs, activeFileId: nextActive };
        });
      },
      setActiveFile: (id) => set({ activeFileId: id }),
      expandedFolders: {
        firmware: true,
        hardware: true,
      },
      toggleFolder: (id) =>
        set((state) => ({
          expandedFolders: {
            ...state.expandedFolders,
            [id]: !state.expandedFolders[id],
          },
        })),
      searchTerm: "",
      setSearchTerm: (value) => set({ searchTerm: value }),
      fileContents,
      updateFileContent: (path, content) =>
        set((state) => ({
          fileContents: {
            ...state.fileContents,
            [path]: content,
          },
        })),
      selectedDeviceId: devices[0]?.id ?? "",
      setSelectedDeviceId: (id) => set({ selectedDeviceId: id }),
      selectedComponentIds: [],
      toggleSelectedComponent: (id) =>
        set((state) => ({
          selectedComponentIds: state.selectedComponentIds.includes(id)
            ? state.selectedComponentIds.filter((item) => item !== id)
            : [...state.selectedComponentIds, id],
        })),
      simulationStatus: "idle",
      setSimulationStatus: (status) => set({ simulationStatus: status }),
      zoom: 1,
      setZoom: (value) => set({ zoom: value }),
      nodes: initialNodes,
      edges: initialEdges,
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      removeNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
          edges: state.edges.filter(
            (edge) => edge.source !== id && edge.target !== id
          ),
        })),
      chatMessages: initialChat,
      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      updateChatMessage: (id, content) =>
        set((state) => ({
          chatMessages: state.chatMessages.map((message) =>
            message.id === id ? { ...message, content } : message
          ),
        })),
      terminalTab: "build",
      setTerminalTab: (tab) => set({ terminalTab: tab }),
      terminalLogs,
      clearTerminal: (tab) =>
        set((state) => ({
          terminalLogs: state.terminalLogs.map((log) =>
            log.tab === tab ? { ...log, lines: [] } : log
          ),
        })),
    }),
    {
      name: "circuitengine-workspace",
      storage: createJSONStorage(safeStorage),
      partialize: (state) => ({
        activeView: state.activeView,
        projectTree: state.projectTree,
        openTabs: state.openTabs,
        activeFileId: state.activeFileId,
        expandedFolders: state.expandedFolders,
        searchTerm: state.searchTerm,
        fileContents: state.fileContents,
        selectedDeviceId: state.selectedDeviceId,
        selectedComponentIds: state.selectedComponentIds,
        simulationStatus: state.simulationStatus,
        zoom: state.zoom,
        nodes: state.nodes,
        edges: state.edges,
        chatMessages: state.chatMessages,
        terminalTab: state.terminalTab,
        terminalLogs: state.terminalLogs,
      }),
      skipHydration: true,
    }
  )
);
