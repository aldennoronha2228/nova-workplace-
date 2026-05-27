"use client";

import { useMemo } from "react";
import Editor from "@monaco-editor/react";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function CodeEditor() {
  const openTabs = useWorkspaceStore((state) => state.openTabs);
  const activeFileId = useWorkspaceStore((state) => state.activeFileId);
  const fileContents = useWorkspaceStore((state) => state.fileContents);
  const updateFileContent = useWorkspaceStore(
    (state) => state.updateFileContent
  );

  const activeFile = useMemo(
    () => openTabs.find((tab) => tab.id === activeFileId),
    [openTabs, activeFileId]
  );

  const value = activeFile ? fileContents[activeFile.path] ?? "" : "";

  return (
    <div className="absolute inset-0">
      <Editor
        theme="vs-dark"
        language={activeFile?.language ?? "plaintext"}
        value={value}
        onChange={(next) => {
          if (!activeFile) return;
          updateFileContent(activeFile.path, next ?? "");
        }}
        options={{
          fontFamily: "JetBrains Mono",
          fontSize: 12,
          minimap: { enabled: true },
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          quickSuggestions: true,
        }}
      />
      <div className="absolute top-3 right-3 bg-surface-container/80 border border-white/10 rounded px-2 py-1 text-[10px] text-on-surface-variant font-label-mono">
        AI Suggestion: refactor sensor read to debounce
      </div>
    </div>
  );
}
