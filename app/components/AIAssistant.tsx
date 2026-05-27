"use client";

import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const suggestions = [
  "Generate initialization code for ESP32",
  "Summarize wiring steps",
  "Validate motor driver pin mapping",
];

export function AIAssistant() {
  const messages = useWorkspaceStore((state) => state.chatMessages);
  const addChatMessage = useWorkspaceStore((state) => state.addChatMessage);
  const updateChatMessage = useWorkspaceStore(
    (state) => state.updateChatMessage
  );
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const messageCounter = useRef(0);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const nextId = (prefix: string) => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `${prefix}-${crypto.randomUUID()}`;
    }
    // fallback for older environments
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  };

  const handleSend = (value?: string) => {
    const prompt = (value ?? input).trim();
    if (!prompt) return;

    const userId = nextId("msg-user");
    const timestamp = getTimestamp();
    addChatMessage({
      id: userId,
      role: "user",
      content: prompt,
      timestamp: `User • ${timestamp}`,
    });

    const assistantId = nextId("msg-ai");
    addChatMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: `Nova AI • ${timestamp}`,
    });

    setInput("");

    const response =
      "I can generate the calibration routine and map the GPIO pins. Should I target the ESP32 ADC2 channel with 12-bit reads and a 50ms debounce?";

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      updateChatMessage(assistantId, response.slice(0, index));
      if (index >= response.length) {
        clearInterval(interval);
      }
    }, 14);
  };

  return (
    <div className="hidden xl:flex w-80 flex-shrink-0 flex-col h-full bg-surface-container/50 border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="p-3 border-b border-white/[0.06] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[16px]">
            smart_toy
          </span>
        </div>
        <div>
          <h2 className="font-body-md text-on-surface font-medium leading-none text-[13px]">
            Nova AI Assistant
          </h2>
          <p className="font-label-mono text-on-surface-variant mt-1 text-[8px] uppercase tracking-widest">
            Engineering Mode
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="px-3 pb-2 flex flex-wrap gap-2">
        {suggestions.map((prompt) => (
          <Button
            key={prompt}
            size="sm"
            variant="outline"
            onClick={() => handleSend(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>

      <div className="p-3 border-t border-white/[0.06] bg-surface-container/30">
        <div className="relative flex items-end bg-surface-container-lowest border border-white/[0.06] rounded-md focus-within:border-white/50 focus-within:ring-1 focus-within:ring-white/50 transition-all">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.ctrlKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            className="w-full bg-transparent border-none py-2 pl-2.5 pr-8 font-body-sm text-xs text-on-surface focus:ring-0 resize-none min-h-[36px] max-h-[100px]"
            placeholder="Ask Nova about schematics..."
            rows={1}
          ></textarea>
          <button
            onClick={() => handleSend()}
            className="absolute bottom-1 right-1 w-6 h-6 rounded bg-white/10 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors"
          >
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
