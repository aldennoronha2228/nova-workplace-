"use client";

import { useMemo } from "react";

import type { FileNode } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function getLanguageFromName(name: string) {
  if (name.endsWith(".ino") || name.endsWith(".cpp")) return "cpp";
  if (name.endsWith(".json")) return "json";
  if (name.endsWith(".md")) return "markdown";
  return "plaintext";
}

function filterTree(nodes: FileNode[], term: string): FileNode[] {
  if (!term) return nodes;
  const lower = term.toLowerCase();

  return nodes
    .map((node) => {
      if (node.type === "file") {
        return node.name.toLowerCase().includes(lower) ? node : null;
      }
      const children = node.children ? filterTree(node.children, term) : [];
      if (children.length) {
        return { ...node, children };
      }
      return null;
    })
    .filter(Boolean) as FileNode[];
}

export function SidebarExplorer() {
  const projectTree = useWorkspaceStore((state) => state.projectTree);
  const openFile = useWorkspaceStore((state) => state.openFile);
  const addFile = useWorkspaceStore((state) => state.addFile);
  const activeFileId = useWorkspaceStore((state) => state.activeFileId);
  const expandedFolders = useWorkspaceStore((state) => state.expandedFolders);
  const toggleFolder = useWorkspaceStore((state) => state.toggleFolder);
  const searchTerm = useWorkspaceStore((state) => state.searchTerm);
  const setSearchTerm = useWorkspaceStore((state) => state.setSearchTerm);
  const updateFileContent = useWorkspaceStore(
    (state) => state.updateFileContent
  );

  const filteredTree = useMemo(
    () => filterTree(projectTree, searchTerm),
    [projectTree, searchTerm]
  );

  const renderTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isActive = node.id === activeFileId;
      const padding = 12 + depth * 10;

      if (node.type === "folder") {
        const isExpanded = expandedFolders[node.id] ?? false;
        return (
          <div key={node.id}>
            <button
              onClick={() => toggleFolder(node.id)}
              className="flex w-full items-center gap-1.5 px-2 py-1 text-[11px] text-on-surface-variant hover:text-on-surface"
              style={{ paddingLeft: `${padding}px` }}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isExpanded ? "expand_more" : "chevron_right"}
              </span>
              <span className="material-symbols-outlined text-[14px]">
                {node.icon || "folder"}
              </span>
              <span className="font-label-mono text-[10px] uppercase tracking-wider">
                {node.name}
              </span>
            </button>
            {isExpanded && node.children && (
              <div className="space-y-0.5">{renderTree(node.children, depth + 1)}</div>
            )}
          </div>
        );
      }

      return (
        <button
          key={node.id}
          onClick={() =>
            openFile({
              id: node.id,
              name: node.name,
              path: node.path,
              language: getLanguageFromName(node.name),
            })
          }
          className={cn(
            "flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50 transition-colors",
            isActive && "text-white bg-white/10 border border-white/20"
          )}
          style={{ paddingLeft: `${padding}px` }}
        >
          <span className="material-symbols-outlined text-[16px]">
            {node.icon || "draft"}
          </span>
          <span className="font-label-mono text-xs font-medium">
            {node.name}
          </span>
        </button>
      );
    });
  };

  return (
    <div className="hidden md:flex w-64 flex-shrink-0 flex-col h-full bg-surface-container/50 border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="p-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-body-md text-on-surface font-medium leading-none">
              Project Alpha
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const name = window.prompt("New file name", "new-file.ino");
                if (!name) return;
                const id = `file-${Date.now()}`;
                const path = `project/firmware/${name}`;
                addFile("firmware", {
                  id,
                  name,
                  type: "file",
                  path,
                  icon: "terminal",
                });
                updateFileContent(path, "// New file\n");
                openFile({
                  id,
                  name,
                  path,
                  language: getLanguageFromName(name),
                });
              }}
              className="w-6 h-6 rounded bg-surface-bright flex items-center justify-center border border-white/[0.06] text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
            </button>
            <div className="w-6 h-6 rounded bg-surface-bright flex items-center justify-center border border-white/[0.06]">
              <span className="material-symbols-outlined text-white text-[14px]">
                developer_board
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search files"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 py-2 px-1">
        <div className="px-2 pb-1.5 pt-1">
          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Project Files
          </span>
        </div>
        <div className="space-y-0.5">{renderTree(filteredTree)}</div>
      </ScrollArea>
    </div>
  );
}
