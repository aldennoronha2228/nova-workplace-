"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGlobalStore from "../../store/useGlobalStore";

export default function GeneratePage() {
  const router = useRouter();
  const prompt = useGlobalStore((s) => s.projectPrompt);
  const title = useGlobalStore((s) => s.projectTitle);
  const setGeneratedFiles = useGlobalStore((s) => s.setGeneratedFiles);

  useEffect(() => {
    if (!prompt) {
      void router.replace("/");
      return;
    }

    // Simulate generation flow: create an id, persist mapping, redirect to workspace
    const id = typeof crypto !== "undefined" && (crypto as any).randomUUID
      ? (crypto as any).randomUUID()
      : `proj-${Date.now()}`;

    // Persist minimal mapping so workspace can hydrate if store is empty
    try {
      const payload = { prompt, title, createdAt: Date.now() };
      localStorage.setItem(`nova_proj_${id}`, JSON.stringify(payload));
    } catch (e) {
      // ignore
    }

    // Optionally set generated files (empty for now)
    setGeneratedFiles([]);

    const t = setTimeout(() => {
      void router.replace(`/workspace/${id}`);
    }, 900);

    return () => clearTimeout(t);
  }, [prompt, router, setGeneratedFiles, title]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-6">
        <h2 className="text-2xl font-semibold">Generating your project…</h2>
        <p className="text-sm text-on-surface/60 mt-2">This may take a moment.</p>
      </div>
    </div>
  );
}
