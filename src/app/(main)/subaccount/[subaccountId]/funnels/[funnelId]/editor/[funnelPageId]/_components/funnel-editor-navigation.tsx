"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveActivityLogsNotification, upsertFunnelPage } from "@/lib/queries";
import { DeviceTypes, useEditor } from "@/providers/editor/editor-provider";
import { FunnelPage } from "../../../../../../../../../../generated/prisma/client";
import clsx from "clsx";
import {
  ArrowLeft,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
  ClipboardCopy,
  ClipboardPaste,
  Download,
  Loader2,
  Code2,
  Cloud,
  CloudOff,
  Play,
  Copy,
  CopyIcon,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { FocusEventHandler, useEffect, useState, useRef } from "react";
import { toast } from "sonner";

type Props = {
  funnelId: string;
  funnelPageDetails: FunnelPage;
  subaccountId: string;
};

export default function FunnelEditorNavigation({
  funnelId,
  funnelPageDetails,
  subaccountId,
}: Props) {
  const router = useRouter();
  const { state, dispatch } = useEditor();
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const { user } = useUser();
  const isAdmin =
    user?.emailAddresses?.[0]?.emailAddress === "ms5392363@gmail.com";
  const lastSavedContent = useRef(funnelPageDetails.content);

  useEffect(() => {
    dispatch({
      type: "SET_FUNNELPAGE_ID",
      payload: { funnelPageId: funnelPageDetails.id },
    });
    setIsPublish(funnelPageDetails.published);
  }, [funnelPageDetails, dispatch]);

  // Auto-save
  useEffect(() => {
    const content = JSON.stringify(state.editor.elements);
    if (content === lastSavedContent.current) return;
    const saveTimer = setTimeout(async () => {
      setIsSaving(true);
      setSaveError(false);
      try {
        const response = await upsertFunnelPage(
          subaccountId,
          { ...funnelPageDetails, content },
          funnelId,
        );
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Updated a funnel page | ${response?.name}`,
          subAccountId: subaccountId,
        });
        lastSavedContent.current = content;
      } catch {
        setSaveError(true);
        toast("Oops!", { description: "Could not auto-save editor" });
      } finally {
        setIsSaving(false);
      }
    }, 1500);
    return () => clearTimeout(saveTimer);
  }, [state.editor.elements, funnelPageDetails, subaccountId, funnelId]);

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    if (event.target.value === funnelPageDetails.name) return;
    if (event.target.value) {
      await upsertFunnelPage(
        subaccountId,
        {
          id: funnelPageDetails.id,
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelId,
      );
      toast("Success", { description: "Saved Funnel Page title" });
      router.refresh();
    } else {
      toast("Oops!", { description: "You need to have a title!" });
      event.target.value = funnelPageDetails.name;
    }
  };

  const updateStatus = async (checked: boolean) => {
    setIsPublish(checked);
    setSaveError(false);
    try {
      const response = await upsertFunnelPage(
        subaccountId,
        { ...funnelPageDetails, published: checked },
        funnelId,
      );
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subAccountId: subaccountId,
      });
      toast("Success", {
        description: "Set as " + (checked ? "Published" : "Draft"),
      });
    } catch {
      setIsPublish(!checked);
      setSaveError(true);
      toast("Oops!", { description: "Could not save publish status" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    if (content === lastSavedContent.current) {
      toast("Success", { description: "Already saved" });
      return;
    }
    setIsSaving(true);
    setSaveError(false);
    try {
      const response = await upsertFunnelPage(
        subaccountId,
        { ...funnelPageDetails, content },
        funnelId,
      );
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subAccountId: subaccountId,
      });
      lastSavedContent.current = content;
      toast("Success", { description: "Saved Editor" });
    } catch {
      setSaveError(true);
      toast("Oops!", { description: "Could not save editor" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/export-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elements: state.editor.elements,
          pageTitle: funnelPageDetails.name,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const blob = new Blob([data.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${funnelPageDetails.name || "page"}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Page exported as HTML!");
    } catch (error: any) {
      toast.error(error.message || "Failed to export");
    } finally {
      setIsExporting(false);
    }
  };

  if (state.editor.previewMode) return null;

  const iconBtn =
    "w-6 h-6 rounded-md hover:bg-muted transition-colors cursor-pointer";

  return (
    <TooltipProvider delayDuration={200}>
      <header className="h-8 min-h-8 border-b border-border/50 bg-background flex items-center justify-between px-2 select-none">
        {/* ─── Left Section: Back + File name ─── */}
        <div className="flex items-center gap-2 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/subaccount/${subaccountId}/funnels/${funnelId}`}
                className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Back to Funnel</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-3 w-px bg-border" />

          <div className="flex items-center gap-1 min-w-0">
            <Input
              defaultValue={funnelPageDetails.name}
              className="border-none h-6 m-0 p-0 px-1 text-xs font-medium bg-transparent focus-visible:ring-1 focus-visible:ring-primary/30 rounded w-[120px]"
              onBlur={handleOnBlurTitleChange}
            />
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              /{funnelPageDetails.pathName}
            </span>
          </div>
        </div>

        {/* ─── Center Section: Device + Undo/Redo + Copy/Paste ─── */}
        <div className="flex items-center gap-0.5">
          {/* Device toggles */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={clsx(
                  iconBtn,
                  state.editor.device === "Desktop" &&
                    "bg-muted text-foreground",
                )}
                onClick={() =>
                  dispatch({
                    type: "CHANGE_DEVICE",
                    payload: { device: "Desktop" },
                  })
                }
              >
                <Laptop className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Desktop</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={clsx(
                  iconBtn,
                  state.editor.device === "Tablet" &&
                    "bg-muted text-foreground",
                )}
                onClick={() =>
                  dispatch({
                    type: "CHANGE_DEVICE",
                    payload: { device: "Tablet" },
                  })
                }
              >
                <Tablet className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tablet</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={clsx(
                  iconBtn,
                  state.editor.device === "Mobile" &&
                    "bg-muted text-foreground",
                )}
                onClick={() =>
                  dispatch({
                    type: "CHANGE_DEVICE",
                    payload: { device: "Mobile" },
                  })
                }
              >
                <Smartphone className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Mobile</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-3 w-px bg-border mx-0.5" />

          {/* Undo / Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                disabled={!(state.history.currentIndex > 0)}
                onClick={() => dispatch({ type: "UNDO" })}
              >
                <Undo2 className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                disabled={
                  !(
                    state.history.currentIndex <
                    state.history.history.length - 1
                  )
                }
                onClick={() => dispatch({ type: "REDO" })}
              >
                <Redo2 className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Copy / Paste */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                disabled={
                  !state.editor.selectedElement.id ||
                  state.editor.selectedElement.id === "__body"
                }
                onClick={() => dispatch({ type: "COPY_ELEMENT" })}
              >
                <CopyIcon className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                disabled={!state.editor.clipboard}
                onClick={() => dispatch({ type: "PASTE_ELEMENT" })}
              >
                <ClipboardPaste className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Paste</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ─── Right Section: Preview + Export + Code + Publish + Save ─── */}
        <div className="flex items-center gap-1">
          {/* Preview */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                onClick={handlePreviewClick}
              >
                <Play className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-4 w-px bg-border mx-0.5" />

          {/* Export HTML */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtn}
                disabled={isExporting}
                onClick={handleExport}
              >
                {isExporting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Export HTML</p>
            </TooltipContent>
          </Tooltip>

          {/* Code Editor */}
          {isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${funnelPageDetails.id}/code`}
                >
                  <Button variant="ghost" size="icon" className={iconBtn}>
                    <Code2 className="w-3 h-3" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Code Editor</p>
              </TooltipContent>
            </Tooltip>
          )}

          <div className="h-3 w-px bg-border mx-0.5" />

          {/* Publish toggle */}
          <div className="flex items-center gap-1 px-0.5">
            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
              {isPublish ? "Live" : "Draft"}
            </span>
            <Switch
              checked={isPublish}
              onCheckedChange={updateStatus}
              className="scale-[0.55] origin-center"
            />
          </div>

          <div className="h-4 w-px bg-border mx-0.5" />

          {/* Save */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={clsx(iconBtn, saveError && "text-destructive")}
                onClick={handleOnSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : saveError ? (
                  <CloudOff className="w-3 h-3" />
                ) : (
                  <Cloud className="w-3 h-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                {isSaving ? "Saving..." : saveError ? "Retry Save" : "Save"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
