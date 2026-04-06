"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DeviceTypes, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import {
  ArrowLeftCircle, EyeIcon, Laptop, Redo2, Smartphone, Tablet,
  Undo2, PanelRightClose, PanelRightOpen, ClipboardCopy, ClipboardPaste,
  Download, Loader2,
} from "lucide-react";
import Link from "next/link";
import React, { FocusEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { DEMO_PAGE_DETAILS } from "../_data/mock-data";

export default function DemoFunnelEditorNav() {
  const { state, dispatch } = useEditor();
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_FUNNELPAGE_ID", payload: { funnelPageId: DEMO_PAGE_DETAILS.id } });
  }, [dispatch]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    toast.info("Demo Mode", { description: "Sign up to save your work!" });
  };

  const handlePreview = () => { dispatch({ type: "TOGGLE_PREVIEW_MODE" }); dispatch({ type: "TOGGLE_LIVE_MODE" }); };
  const handleUndo = () => dispatch({ type: "UNDO" });
  const handleRedo = () => dispatch({ type: "REDO" });
  const handleToggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });
  const handleSave = () => toast.info("Demo Mode", { description: "Sign up to save your work!" });

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/export-html", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ elements: state.editor.elements, pageTitle: DEMO_PAGE_DETAILS.name }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const blob = new Blob([data.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${DEMO_PAGE_DETAILS.name}.html`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      toast.success("Page exported as HTML!");
    } catch { toast.info("Demo Mode", { description: "Sign up to export!" }); }
    finally { setIsExporting(false); }
  };

  return (
    <TooltipProvider>
      <nav className={clsx("border-b flex items-center justify-between p-6 py-3 gap-2 transition-all", { "h-0! p-0! overflow-hidden! z-300": state.editor.previewMode })}>
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href="/site/demo"><ArrowLeftCircle /></Link>
          <div className="flex flex-col w-full">
            <Input defaultValue={DEMO_PAGE_DETAILS.name} className="border-none h-5 m-0 pl-2 text-lg" onBlur={handleBlur} />
            <span className="text-sm pl-2 text-muted-foreground">Path: /{DEMO_PAGE_DETAILS.pathName}</span>
          </div>
        </aside>
        <aside>
          <Tabs defaultValue="Desktop" className="w-fit" value={state.editor.device} onValueChange={(v) => dispatch({ type: "CHANGE_DEVICE", payload: { device: v as DeviceTypes } })}>
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip><TooltipTrigger asChild><TabsTrigger value="Desktop" className="data-[state=active]:bg-muted! w-10 h-10 p-0"><Laptop /></TabsTrigger></TooltipTrigger><TooltipContent><p>Desktop</p></TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><TabsTrigger value="Tablet" className="w-10 h-10 p-0 data-[state=active]:bg-muted"><Tablet /></TabsTrigger></TooltipTrigger><TooltipContent><p>Tablet</p></TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><TabsTrigger value="Mobile" className="w-10 h-10 p-0 data-[state=active]:bg-muted"><Smartphone /></TabsTrigger></TooltipTrigger><TooltipContent><p>Mobile</p></TooltipContent></Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-slate-800" onClick={handlePreview}><EyeIcon /></Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-800" onClick={handleToggleSidebar}>{state.editor.sidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}</Button>
          <Button disabled={!state.editor.selectedElement.id || state.editor.selectedElement.id === "__body"} onClick={() => dispatch({ type: "COPY_ELEMENT" })} variant="ghost" size="icon" className="hover:bg-slate-800"><ClipboardCopy className="w-4 h-4" /></Button>
          <Button disabled={!state.editor.clipboard} onClick={() => dispatch({ type: "PASTE_ELEMENT" })} variant="ghost" size="icon" className="hover:bg-slate-800"><ClipboardPaste className="w-4 h-4" /></Button>
          <Button disabled={!(state.history.currentIndex > 0)} onClick={handleUndo} variant="ghost" size="icon" className="hover:bg-slate-800"><Undo2 /></Button>
          <Button disabled={!(state.history.currentIndex < state.history.history.length - 1)} onClick={handleRedo} variant="ghost" size="icon" className="hover:bg-slate-800 mr-4"><Redo2 /></Button>
          <div className="flex flex-col item-center mr-4">
            <div className="flex flex-row items-center gap-4">Draft<Switch disabled defaultChecked={true} />Publish</div>
            <span className="text-muted-foreground text-sm">Last updated {DEMO_PAGE_DETAILS.updatedAt.toLocaleDateString()}</span>
          </div>
          <Button variant="outline" size="icon" className="hover:bg-slate-800" disabled={isExporting} onClick={handleExport}>{isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}</Button>
          <Button onClick={handleSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
}
