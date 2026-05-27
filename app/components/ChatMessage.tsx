"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage as ChatMessageType } from "@/types/workspace";
import { cn } from "@/lib/utils";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "rounded-lg p-2.5 max-w-[95%] border",
          isUser
            ? "bg-surface-bright border-white/[0.06] rounded-tr-sm"
            : "bg-white/5 border-white/10 rounded-tl-sm"
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, children }) {
              if (inline) {
                return (
                  <code className="bg-white/10 px-1 py-0.5 rounded text-[10px] font-label-mono">
                    {children}
                  </code>
                );
              }

              const text = String(children).replace(/\n$/, "");
              return (
                <div className="bg-surface-container-lowest border border-white/[0.06] rounded-md overflow-hidden my-2">
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-2 py-1.5 bg-surface-container-low">
                    <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-wider">
                      Code
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(text);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {copied ? "check" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <pre className="p-2.5 text-[10px] text-on-surface font-label-mono whitespace-pre-wrap">
                    {text}
                  </pre>
                </div>
              );
            },
            p({ children }) {
              return (
                <p className="font-body-sm text-on-surface text-xs leading-relaxed">
                  {children}
                </p>
              );
            },
            ul({ children }) {
              return (
                <ul className="list-disc list-inside text-[11px] text-on-surface-variant space-y-1">
                  {children}
                </ul>
              );
            },
            strong({ children }) {
              return <strong className="text-white font-medium">{children}</strong>;
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      <span
        className={cn(
          "font-label-mono text-[8px] text-on-surface-variant/70 uppercase",
          isUser ? "mr-1" : "ml-1"
        )}
      >
        {message.timestamp}
      </span>
    </div>
  );
}
