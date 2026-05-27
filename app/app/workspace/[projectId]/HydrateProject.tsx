"use client";
import { useEffect } from "react";
import useGlobalStore from "../../../store/useGlobalStore";

export default function HydrateProject({ projectId }: { projectId: string }) {
  const projectPrompt = useGlobalStore((s) => s.projectPrompt);
  const setProjectPrompt = useGlobalStore((s) => s.setProjectPrompt);
  const setProjectTitle = useGlobalStore((s) => s.setProjectTitle);
  const setGeneratedFiles = useGlobalStore((s) => s.setGeneratedFiles);

  useEffect(() => {
    if (projectPrompt) return; // already hydrated
    try {
      const raw = localStorage.getItem(`nova_proj_${projectId}`);
      if (!raw) return;
      const payload = JSON.parse(raw);
      if (payload?.prompt) setProjectPrompt(payload.prompt);
      if (payload?.title) setProjectTitle(payload.title);
      if (payload?.generatedFiles) setGeneratedFiles(payload.generatedFiles);
    } catch (e) {
      // ignore parse errors
    }
  }, [projectId, projectPrompt, setProjectPrompt, setProjectTitle, setGeneratedFiles]);

  return null;
}
