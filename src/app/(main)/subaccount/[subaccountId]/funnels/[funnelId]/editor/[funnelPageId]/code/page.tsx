import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CodeEditorClient from "./_components/code-editor-client";

type Props = {
  params: Promise<{
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  }>;
};

export default async function CodeEditorPage({ params }: Props) {
  const param = await params;
  const user = await currentUser();

  // Admin-only: check email
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  if (!user || userEmail !== "ms5392363@gmail.com") {
    return redirect(
      `/subaccount/${param.subaccountId}/funnels/${param.funnelId}/editor/${param.funnelPageId}`
    );
  }

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: { id: param.funnelPageId },
  });

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${param.subaccountId}/funnels/${param.funnelId}`
    );
  }

  return (
    <CodeEditorClient
      funnelPageId={param.funnelPageId}
      funnelId={param.funnelId}
      subaccountId={param.subaccountId}
      pageName={funnelPageDetails.name}
      initialContent={funnelPageDetails.content || "[]"}
    />
  );
}
