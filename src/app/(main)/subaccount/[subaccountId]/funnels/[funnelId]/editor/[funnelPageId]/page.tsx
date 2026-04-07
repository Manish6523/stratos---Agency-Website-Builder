import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import FunnelEditor from "./_components/funnel-editor";
import { getSubscriptionPlanBySubaccountId } from "@/lib/queries";
import FunnelEditorLeftSidebar from "./_components/funnel-editor-left-sidebar";

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

  const activePlan = await getSubscriptionPlanBySubaccountId(
    param.subaccountId,
  );

  const isPaidPlan =
    activePlan === "plan_basic" || activePlan === "plan_unlimited_saas";

  return (
    <div className="fixed inset-0 z-20 bg-background overflow-hidden flex flex-col">
      <EditorProvider
        subaccountId={param.subaccountId}
        funnelId={param.funnelId}
        pageDetails={funnelPageDetails}
      >
        {/* ─── Top Bar ─── */}
        <FunnelEditorNavigation
          funnelId={param.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={param.subaccountId}
        />

        {/* ─── Main Area: Left Sidebar | Canvas | Right Sidebar ─── */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar — Assets, Components, Layers, etc. */}
          <FunnelEditorLeftSidebar
            subaccountId={param.subaccountId}
            isPaidPlan={isPaidPlan}
          />

          {/* Canvas */}
          <div className="flex-1 overflow-auto flex justify-center h-full p-2 bg-muted/50">
            <FunnelEditor funnelPageId={param.funnelPageId} />
          </div>

          {/* Right Sidebar — Properties / Styles */}
          <FunnelEditorSidebar
            subaccountId={param.subaccountId}
            isPaidPlan={isPaidPlan}
          />
        </div>
      </EditorProvider>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const param = await params;
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: param.funnelPageId,
    },
  });

  return {
    title: funnelPageDetails?.customName
      ? `${funnelPageDetails.customName} | Stratos Editor`
      : `${funnelPageDetails?.name || "Page"} | Stratos Editor`,
  };
}
