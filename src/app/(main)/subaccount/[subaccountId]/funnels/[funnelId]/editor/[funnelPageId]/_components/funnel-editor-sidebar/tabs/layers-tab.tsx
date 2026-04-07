"use client";
import React, { useState, useCallback } from "react";
import {
  EditorElement,
  useEditor,
} from "@/providers/editor/editor-provider";

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
  ChevronsUpDown,
  ChevronsDownUp,
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

    const targetEl = document.getElementById(element.id);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

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
          "flex items-center gap-1.5 h-6 cursor-pointer text-xs transition-colors group select-none pr-2",
          "hover:bg-muted/60",
          {
            "bg-primary/10 text-primary": isSelected,
            "text-muted-foreground": !isSelected,
          }
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse toggle */}
        {isContainer ? (
          <button
            onClick={handleToggle}
            className="w-4 h-4 flex items-center justify-center rounded hover:bg-muted shrink-0 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown size={12} className="text-muted-foreground opacity-70 group-hover:opacity-100" />
            ) : (
              <ChevronRight size={12} className="text-muted-foreground opacity-70 group-hover:opacity-100" />
            )}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Type icon */}
        <div className={clsx("opacity-80 transition-opacity", { "opacity-100": isSelected })}>
          {typeIconMap[element.type || ""] || (
            <Box size={12} className="text-gray-400 shrink-0" />
          )}
        </div>

        {/* Element name */}
        <span
          className={clsx("truncate font-medium text-[11px] mt-px", {
            "text-primary font-semibold": isSelected,
            "group-hover:text-foreground text-foreground/80": !isSelected,
          })}
        >
          {element.name}
        </span>
      </div>

      {/* Render children if expanded */}
      {isContainer && isExpanded && hasChildren && (
        <div className="flex flex-col">
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
      <div className="px-3 border-b border-border/50 shrink-0">
        <div className="flex items-center justify-between h-9">
          <h2 className="text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider text-muted-foreground">
            Layers
          </h2>
          {/* Toolbar */}
          <div className="flex items-center gap-1">
            <button
              onClick={expandAll}
              title="Expand All"
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronsUpDown size={12} />
            </button>
            <button
              onClick={collapseAll}
              title="Collapse All"
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronsDownUp size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pt-1 pb-4">
        {!Array.isArray(state.editor.elements) || state.editor.elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground/50">
            <Layers size={24} className="mb-2" />
            <p className="text-[10px] uppercase font-medium tracking-wider">Empty Canvas</p>
          </div>
        ) : (
          <div className="flex flex-col">
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
      </div>
    </div>
  );
};

export default LayersTab;
