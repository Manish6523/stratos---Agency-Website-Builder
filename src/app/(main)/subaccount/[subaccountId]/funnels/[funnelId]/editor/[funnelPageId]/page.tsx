import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import FunnelEditor from "./_components/funnel-editor";

type Props = {
  params: Promise<{
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const param = await params;

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: param.funnelPageId,
    },
  });

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${param.subaccountId}/funnels/${param.funnelId}`,
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-background overflow-hidden">
      <EditorProvider
        subaccountId={param.subaccountId}
        funnelId={param.funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={param.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={param.subaccountId}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={param.funnelPageId} />
        </div>

        <FunnelEditorSidebar subaccountId={param.subaccountId} />
      </EditorProvider>
    </div>
  );
}
