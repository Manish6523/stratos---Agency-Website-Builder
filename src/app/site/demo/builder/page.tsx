"use client";
import React from "react";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorSidebar from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar";
import DemoFunnelEditor from "../_components/DemoFunnelEditor";
import DemoFunnelEditorNav from "../_components/DemoFunnelEditorNav";
import { DEMO_PAGE_DETAILS } from "../_data/mock-data";

export default function DemoBuilderPage() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-background overflow-hidden">
      <EditorProvider
        subaccountId="demo-subaccount"
        funnelId="demo-funnel"
        pageDetails={DEMO_PAGE_DETAILS as any}
      >
        <DemoFunnelEditorNav />
        <div className="h-full flex justify-center">
          <DemoFunnelEditor />
        </div>
        <FunnelEditorSidebar subaccountId="demo-subaccount" isPaidPlan={true} />
      </EditorProvider>
    </div>
  );
}
