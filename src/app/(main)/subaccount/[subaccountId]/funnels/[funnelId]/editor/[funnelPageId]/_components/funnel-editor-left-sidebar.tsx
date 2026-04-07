"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/editor-provider";
import React, { useState } from "react";
import ComponentsTab from "./funnel-editor-sidebar/tabs/components-tab";
import MediaBucketTab from "./funnel-editor-sidebar/tabs/media-bucket-tab";
import AiBuilderTab from "./funnel-editor-sidebar/tabs/ai-builder-tab";
import PagesTab from "./funnel-editor-sidebar/tabs/pages-tab";
import TemplatesTab from "./funnel-editor-sidebar/tabs/templates-tab";
import UpgradeOverlay from "./funnel-editor-sidebar/tabs/upgrade-overlay";
import LayersTab from "./funnel-editor-sidebar/tabs/layers-tab";
import {
  Plus,
  SquareStackIcon,
  Database,
  Sparkles,
  LayoutTemplate,
  PanelsTopLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type Props = {
  subaccountId: string;
  isPaidPlan: boolean;
};

const tabs = [
  { value: "Components", icon: Plus, label: "Components" },
  { value: "Layers", icon: SquareStackIcon, label: "Layers" },
  { value: "Media", icon: Database, label: "Media" },
  { value: "Pages", icon: LayoutTemplate, label: "Pages" },
  { value: "Templates", icon: PanelsTopLeft, label: "Templates" },
  { value: "AI", icon: Sparkles, label: "AI" },
] as const;

export default function FunnelEditorLeftSidebar({
  subaccountId,
  isPaidPlan,
}: Props) {
  const { state } = useEditor();
  const [activeTab, setActiveTab] = useState("Components");
  const [collapsed, setCollapsed] = useState(false);

  if (state.editor.previewMode) return null;

  return (
    <div
      className="h-full bg-background border-r border-border/50 flex flex-col overflow-hidden transition-all duration-200"
      style={{ width: collapsed ? "0px" : "200px", minWidth: collapsed ? "0px" : "200px" }}
    >
      {/* Toggle button — always visible at the edge */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-4 h-8 bg-background border border-border/50 rounded-r-md flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
        style={{ left: collapsed ? "0px" : "200px" }}
        title={collapsed ? "Open left panel" : "Close left panel"}
      >
        {collapsed ? (
          <PanelLeftOpen className="w-2.5 h-2.5" />
        ) : (
          <PanelLeftClose className="w-2.5 h-2.5" />
        )}
      </button>

      {!collapsed && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          {/* Tab icons row */}
          <div className="border-b border-border/50 px-1 py-0.5">
            <TabsList className="bg-transparent h-6 w-full gap-1 p-0 justify-start">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    title={tab.label}
                    className="h-6 w-6 p-0 rounded data-[state=active]:bg-muted data-[state=active]:text-foreground hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Icon className={`w-3 h-3 ${tab.value === "AI" ? "text-primary" : ""}`} />
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Section label */}
          <div className="px-2 py-1 border-b border-border/30">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {activeTab}
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <TabsContent value="Components" className="mt-0 h-full">
              <ComponentsTab />
            </TabsContent>
            <TabsContent value="Layers" className="mt-0 h-full">
              <LayersTab />
            </TabsContent>
            <TabsContent value="Media" className="mt-0 h-full">
              <MediaBucketTab subaccountId={subaccountId} />
            </TabsContent>
            <TabsContent value="Pages" className="mt-0 h-full">
              <PagesTab />
            </TabsContent>
            <TabsContent value="Templates" className="mt-0 h-full">
              {isPaidPlan ? <TemplatesTab /> : <UpgradeOverlay feature="Templates" />}
            </TabsContent>
            <TabsContent value="AI" className="mt-0 h-full">
              {isPaidPlan ? <AiBuilderTab /> : <UpgradeOverlay feature="AI Builder" />}
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
}
