export type WorkspaceView =
  | "code"
  | "diagram"
  | "components"
  | "simulation"
  | "assembly";

export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  icon?: string;
  children?: FileNode[];
};

export type FileTab = {
  id: string;
  name: string;
  path: string;
  language: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
};

export type TerminalTab = "build" | "serial" | "debug" | "ai";

export type TerminalLog = {
  id: string;
  tab: TerminalTab;
  lines: string[];
  status: "idle" | "running" | "success" | "error";
};

export type DeviceOption = {
  id: string;
  label: string;
};
