"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "../../store/useGlobalStore";

export type PromptInputBoxProps = {
  placeholder?: string;
  className?: string;
};

export default function PromptInputBox({
  placeholder = "What do you want to build?",
  className,
}: PromptInputBoxProps) {
  const [input, setInput] = useState("");
  const setProjectPrompt = useGlobalStore((s) => s.setProjectPrompt);
  const setProjectTitle = useGlobalStore((s) => s.setProjectTitle);
  const router = useRouter();

  const handleSend = () => {
    const prompt = input.trim();
    if (!prompt) return;
    setProjectPrompt(prompt);
    // Derive a simple title if none provided
    const title = prompt.split(" ").slice(0, 6).join(" ");
    setProjectTitle(title);
    setInput("");
    // navigate to generate page which will handle creation then redirect to workspace
    void router.push("/generate");
  };

  return (
    <div className={className}>
      <div className="flex gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg bg-surface text-on-surface placeholder:text-muted"
        />
        <button
          onClick={handleSend}
          className="px-4 py-3 rounded-lg bg-accent text-black font-semibold"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
