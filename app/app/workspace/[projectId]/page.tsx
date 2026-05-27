import { redirect } from "next/navigation";

export default function ProjectIndex({
  params,
}: {
  params: { projectId: string };
}) {
  redirect(`/workspace/${params.projectId}/diagram`);
}
