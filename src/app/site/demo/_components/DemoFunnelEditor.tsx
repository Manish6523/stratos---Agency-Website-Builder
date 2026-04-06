"use client";
import { Button } from "@/components/ui/button";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect } from "react";
import Recursive from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/FunnelEditorComponents/Recursive";
import { DEMO_ELEMENTS } from "../_data/mock-data";

export default function DemoFunnelEditor() {
  const { dispatch, state } = useEditor();

  useEffect(() => {
    dispatch({
      type: "LOAD_DATA",
      payload: { elements: DEMO_ELEMENTS as EditorElement[], withLive: false },
    });
  }, [dispatch]);

  const handleClick = () => dispatch({ type: "CHANGE_CLICKED_ELEMENT", payload: {} });

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
      if (e.key === "c" && (e.ctrlKey || e.metaKey)) dispatch({ type: "COPY_ELEMENT" });
      if (e.key === "v" && (e.ctrlKey || e.metaKey)) dispatch({ type: "PASTE_ELEMENT" });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full mr-[385px] bg-background transition-all rounded-md",
        {
          "p-0! mr-0!": state.editor.previewMode || state.editor.liveMode,
          "mr-0!": !state.editor.sidebarOpen,
          "w-[850px]!": state.editor.device === "Tablet",
          "w-[420px]!": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
          "pb-18": !state.editor.previewMode || !state.editor.liveMode,
        },
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button variant="ghost" size="icon" className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-10000000" onClick={handleUnpreview}>
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
}
