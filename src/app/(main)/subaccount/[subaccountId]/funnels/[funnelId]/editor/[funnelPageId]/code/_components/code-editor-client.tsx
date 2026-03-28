"use client";

import React, { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftCircle,
  Save,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditorProvider, { useEditor } from "@/providers/editor/editor-provider";
import Recursive from "../../_components/funnel-editor/FunnelEditorComponents/Recursive";

const LivePreviewPlayer = ({ liveContent }: { liveContent: string }) => {
  const { dispatch, state } = useEditor();

  React.useEffect(() => {
    dispatch({ type: "TOGGLE_LIVE_MODE", payload: { value: true } });
  }, [dispatch]);

  React.useEffect(() => {
    try {
      if (!liveContent) return;
      const parsed = JSON.parse(liveContent);
      const elementsArray = Array.isArray(parsed) ? parsed : [parsed];
      dispatch({
        type: "LOAD_DATA",
        payload: { elements: elementsArray, withLive: true },
      });
    } catch {
      // Ignore parse errors while typing
    }
  }, [liveContent, dispatch]);

  if (!Array.isArray(state.editor.elements)) return null;

  return (
    <div className="h-full w-full overflow-auto bg-background rounded-md pb-18">
      {state.editor.elements.map((childElement) => (
        <Recursive key={childElement.id} element={childElement} />
      ))}
    </div>
  );
};

type Props = {
  funnelPageId: string;
  funnelId: string;
  subaccountId: string;
  pageName: string;
  initialContent: string;
};

export default function CodeEditorClient({
  funnelPageId,
  funnelId,
  subaccountId,
  pageName,
  initialContent,
}: Props) {
  const router = useRouter();
  const [content, setContent] = useState(() => {
    try {
      return JSON.stringify(JSON.parse(initialContent), null, 2);
    } catch {
      return initialContent;
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const originalContent = (() => {
    try {
      return JSON.stringify(JSON.parse(initialContent), null, 2);
    } catch {
      return initialContent;
    }
  })();

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newVal = value || "";
      setContent(newVal);
      setHasChanges(newVal !== originalContent);
    },
    [originalContent]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Validate JSON first
      let parsed = JSON.parse(content);
      
      // Auto-wrap solitary object code in an array for state mapping
      if (!Array.isArray(parsed)) {
        parsed = [parsed];
        setContent(JSON.stringify(parsed, null, 2));
      }
      
      const minified = JSON.stringify(parsed);

      const response = await fetch("/api/update-page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          funnelPageId,
          content: minified,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save");
      }

      toast.success("Page content saved!");
      setHasChanges(false);
      router.refresh();
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        toast.error("Invalid JSON — fix syntax errors before saving.");
      } else {
        toast.error(error.message || "Failed to save");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setContent(originalContent);
    setHasChanges(false);
    toast.info("Reset to last saved state.");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    try {
      let parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) parsed = [parsed];
      setContent(JSON.stringify(parsed, null, 2));
      toast.success("Formatted!");
    } catch {
      toast.error("Cannot format — fix JSON syntax errors first.");
    }
  };

  const editorUrl = `/subaccount/${subaccountId}/funnels/${funnelId}/editor/${funnelPageId}`;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-4">
          <Link href={editorUrl}>
            <ArrowLeftCircle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Code Editor</span>
            <span className="text-xs text-muted-foreground">
              — {pageName}
            </span>
          </div>
          {hasChanges && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFormat}
            className="text-xs h-8"
            title="Format JSON"
          >
            <Code2 className="w-3.5 h-3.5 mr-1.5" />
            Format
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-8"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <Copy className="w-3.5 h-3.5 mr-1.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
            className="text-xs h-8"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
          <Link href={editorUrl}>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Visual Editor
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            size="sm"
            className="text-xs h-8"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 mr-1.5" />
            )}
            Save
          </Button>
        </div>
      </nav>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Monaco Editor (left) */}
        <div className="w-1/2 flex flex-col h-full border-r border-border">
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="json"
              value={content}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace",
                fontLigatures: true,
                minimap: { enabled: true },
                wordWrap: "on",
                tabSize: 2,
                formatOnPaste: true,
                autoClosingBrackets: "always",
                bracketPairColorization: { enabled: true },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                renderLineHighlight: "all",
                padding: { top: 16 },
                lineNumbers: "on",
                folding: true,
                foldingStrategy: "auto",
                suggest: {
                  showKeywords: true,
                },
              }}
            />
          </div>
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-muted/50 text-[11px] text-muted-foreground shrink-0">
            <span>JSON • {pageName}</span>
            <span>{content.split("\n").length} lines • {content.length} chars</span>
          </div>
        </div>

        {/* Live Preview (right) */}
        <div className="w-1/2 flex flex-col h-full bg-background relative overflow-hidden">
          <div className="flex items-center justify-between px-4 py-1.5 border-b border-border bg-muted/50 text-[11px] text-muted-foreground shrink-0">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-primary" />
              Live Preview
            </span>
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded">As you type</span>
          </div>
          <div className="flex-1 relative bg-slate-50 dark:bg-background/50 overflow-hidden">
            <div className="w-[125%] h-[125%] origin-top-left scale-[0.8] overflow-auto">
              <EditorProvider
                subaccountId={subaccountId}
                funnelId={funnelId}
                pageDetails={{
                  id: funnelPageId,
                  content: initialContent,
                  name: pageName,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  visits: 0,
                  order: 0,
                  funnelId,
                  pathName: "",
                  previewImage: null,
                } as any}
              >
                <LivePreviewPlayer liveContent={content} />
              </EditorProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
