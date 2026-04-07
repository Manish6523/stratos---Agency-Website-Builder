"use client";
import { useEditor } from "@/providers/editor/editor-provider";
import React, { useState } from "react";
import SettingsTab from "./tabs/setting-tab";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

type Props = {
  subaccountId: string;
  isPaidPlan: boolean;
};

export default function FunnelEditorSidebar({
  subaccountId,
  isPaidPlan,
}: Props) {
  const { state } = useEditor();
  const [collapsed, setCollapsed] = useState(false);

  if (state.editor.previewMode) return null;

  return (
    <div
      className="h-full bg-background border-l border-border/50 flex flex-col overflow-hidden transition-all duration-200"
      style={{ width: collapsed ? "0px" : "240px", minWidth: collapsed ? "0px" : "240px" }}
    >
      {/* Toggle button — at the edge */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-4 h-8 bg-background border border-border/50 rounded-l-md flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
        style={{ right: collapsed ? "0px" : "240px" }}
        title={collapsed ? "Open right panel" : "Close right panel"}
      >
        {collapsed ? (
          <PanelRightOpen className="w-2.5 h-2.5" />
        ) : (
          <PanelRightClose className="w-2.5 h-2.5" />
        )}
      </button>

      {!collapsed && (
        <>
          {/* Header — Design / Inspect tabs */}
          <div className="border-b border-border/50 px-2 pt-1 pb-1 flex items-center gap-2">
            <button className="text-[10px] font-semibold text-foreground border-b border-primary pb-0.5 cursor-pointer">
              Design
            </button>
            <button className="text-[10px] font-medium text-muted-foreground pb-0.5 hover:text-foreground transition-colors cursor-pointer">
              Inspect
            </button>
          </div>

          {/* Selected element info */}
          {state.editor.selectedElement.id &&
            state.editor.selectedElement.id !== "" && (
              <div className="px-2 py-1 border-b border-border/30 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-medium truncate">
                  {state.editor.selectedElement.name || "Element"}
                </span>
                <span className="text-[9px] text-muted-foreground ml-auto">
                  {state.editor.selectedElement.type}
                </span>
              </div>
            )}

          {/* Properties content */}
          <div className="flex-1 overflow-auto pb-16">
            <SettingsTab />
          </div>
        </>
      )}
    </div>
  );
}
