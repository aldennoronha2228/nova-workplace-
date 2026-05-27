import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";
import HydrateProject from "./HydrateProject";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { projectId: string };
}) {
  return (
    <>
      <HydrateProject projectId={params.projectId} />
      <AppShell />
      {children}
    </>
  );
}
