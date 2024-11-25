import Editor from "@/app/workflow/_components/editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function EditorWorkflowPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
  }) {
  const workflowId = (await params).workflowId;
  const { userId } = await auth();

  if (!userId) {
    return <div>unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}
