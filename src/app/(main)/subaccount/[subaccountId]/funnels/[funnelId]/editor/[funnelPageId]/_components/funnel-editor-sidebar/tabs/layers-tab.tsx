"use client";
import React, { useState, useCallback } from "react";
import {
  EditorElement,
  useEditor,
} from "@/providers/editor/editor-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  ChevronDown,
  Box,
  Type,
  Image,
  Video,
  Link2,
  SeparatorHorizontal,
  MousePointerClick,
  Code,
  Columns2,
  Columns3,
  Grid3X3,
  MessageSquareQuote,
  BarChart3,
  GalleryHorizontal,
  CircleDot,
  Mail,
  CreditCard,
  Layers,
  Globe,
} from "lucide-react";
import clsx from "clsx";

const typeIconMap: Record<string, React.ReactNode> = {
  __body: <Globe size={14} className="text-yellow-400 shrink-0" />,
  container: <Box size={14} className="text-blue-400 shrink-0" />,
  "2Col": <Columns2 size={14} className="text-purple-400 shrink-0" />,
  "3Col": <Columns3 size={14} className="text-purple-400 shrink-0" />,
  grid: <Grid3X3 size={14} className="text-indigo-400 shrink-0" />,
  text: <Type size={14} className="text-emerald-400 shrink-0" />,
  h1: <Type size={14} className="text-emerald-500 shrink-0" />,
  h2: <Type size={14} className="text-emerald-400 shrink-0" />,
  h3: <Type size={14} className="text-emerald-300 shrink-0" />,
  image: <Image size={14} className="text-pink-400 shrink-0" />,
  video: <Video size={14} className="text-red-400 shrink-0" />,
  link: <Link2 size={14} className="text-cyan-400 shrink-0" />,
  divider: <SeparatorHorizontal size={14} className="text-gray-400 shrink-0" />,
  button: <MousePointerClick size={14} className="text-orange-400 shrink-0" />,
  customEmbed: <Code size={14} className="text-amber-400 shrink-0" />,
  testimonial: <MessageSquareQuote size={14} className="text-violet-400 shrink-0" />,
  progressBar: <BarChart3 size={14} className="text-teal-400 shrink-0" />,
  slider: <GalleryHorizontal size={14} className="text-rose-400 shrink-0" />,
  iconBlock: <CircleDot size={14} className="text-sky-400 shrink-0" />,
  contactForm: <Mail size={14} className="text-blue-300 shrink-0" />,
  paymentForm: <CreditCard size={14} className="text-green-400 shrink-0" />,
};

const isContainerType = (type: string | null): boolean => {
  return ["__body", "container", "2Col", "3Col", "grid"].includes(type || "");
};

type TreeNodeProps = {
  element: EditorElement;
  depth: number;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
};

const TreeNode = ({
  element,
  depth,
  expandedNodes,
  toggleNode,
}: TreeNodeProps) => {
  const { state, dispatch } = useEditor();
  const isSelected = state.editor.selectedElement.id === element.id;
  const hasChildren =
    Array.isArray(element.content) && element.content.length > 0;
  const isExpanded = expandedNodes.has(element.id);
  const isContainer = isContainerType(element.type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: element },
    });

    // Scroll within the editor canvas only (not the whole page)
    const targetEl = document.getElementById(element.id);
    const editorContainer = document.querySelector(
      ".use-automation-zoom-in"
    ) as HTMLElement | null;

    if (targetEl && editorContainer) {
      const containerRect = editorContainer.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const scrollOffset =
        targetRect.top -
        containerRect.top +
        editorContainer.scrollTop -
        containerRect.height / 2 +
        targetRect.height / 2;

      editorContainer.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });

      // Brief flash highlight
      targetEl.style.transition = "outline 0.2s ease";
      targetEl.style.outline = "2px solid hsl(var(--primary))";
      targetEl.style.outlineOffset = "2px";
      setTimeout(() => {
        targetEl.style.outline = "";
        targetEl.style.outlineOffset = "";
      }, 1200);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode(element.id);
  };

  return (
    <div>
      <div
        className={clsx(
          "flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer text-xs transition-all group",
          "hover:bg-muted/80",
          {
            "bg-primary/15 text-primary border border-primary/20": isSelected,
            "text-muted-foreground": !isSelected,
          }
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse toggle */}
        {isContainer ? (
          <button
            onClick={handleToggle}
            className="p-0.5 rounded hover:bg-muted shrink-0 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown size={12} className="text-muted-foreground" />
            ) : (
              <ChevronRight size={12} className="text-muted-foreground" />
            )}
          </button>
        ) : (
          <span className="w-[18px] shrink-0" />
        )}

        {/* Type icon */}
        {typeIconMap[element.type || ""] || (
          <Box size={14} className="text-gray-400 shrink-0" />
        )}

        {/* Element name */}
        <span
          className={clsx("truncate font-medium", {
            "text-primary": isSelected,
            "group-hover:text-foreground": !isSelected,
          })}
        >
          {element.name}
        </span>

        {/* Type badge */}
        <span className="ml-auto text-[10px] text-muted-foreground/60 font-mono shrink-0">
          {element.type}
        </span>
      </div>

      {/* Render children if expanded */}
      {isContainer && isExpanded && hasChildren && (
        <div className="relative">
          {/* Tree line connector */}
          <div
            className="absolute top-0 bottom-0 border-l border-border/40"
            style={{ left: `${depth * 16 + 17}px` }}
          />
          {(element.content as EditorElement[]).map((child) => (
            <TreeNode
              key={child.id}
              element={child}
              depth={depth + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LayersTab = () => {
  const { state } = useEditor();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["__body"])
  );

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const allIds = new Set<string>();
    const collect = (elements: EditorElement[]) => {
      for (const el of elements) {
        if (isContainerType(el.type)) {
          allIds.add(el.id);
        }
        if (Array.isArray(el.content)) {
          collect(el.content);
        }
      }
    };
    collect(state.editor.elements);
    setExpandedNodes(allIds);
  }, [state.editor.elements]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 pb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Layers size={18} /> Layers
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          View and navigate the element tree of your page.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 pb-3">
        <button
          onClick={expandAll}
          className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider px-2 py-1 rounded hover:bg-muted"
        >
          Expand All
        </button>
        <span className="text-border">|</span>
        <button
          onClick={collapseAll}
          className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider px-2 py-1 rounded hover:bg-muted"
        >
          Collapse All
        </button>
      </div>

      <ScrollArea className="flex-1 px-3 pb-6">
        {!Array.isArray(state.editor.elements) || state.editor.elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-10 text-center text-muted-foreground">
            <Layers size={32} className="mb-2 opacity-20" />
            <p className="text-sm">Nothing to map</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {state.editor.elements.map((element) => (
              <TreeNode
                key={element.id}
                element={element}
                depth={0}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayersTab;
