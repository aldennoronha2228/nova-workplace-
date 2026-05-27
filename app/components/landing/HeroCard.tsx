"use client";
import React from "react";
import PromptInputBox from "./PromptInputBox";

export default function HeroCard() {
  return (
    <section className="px-6 py-12 max-w-[1200px] mx-auto">
      <div className="hero-badge text-sm uppercase text-secondary-container mb-4">
        AI-NATIVE HARDWARE PLATFORM
      </div>

      <h1 className="text-4xl font-bold mb-6">
        Design, simulate, and deploy
        <br />
        <span className="italic">intelligent hardware</span> with AI.
      </h1>

      <div className="w-full">
        <PromptInputBox />
      </div>
    </section>
  );
}
