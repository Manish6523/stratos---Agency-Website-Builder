"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import * as lucideIcons from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const IconBlockComponent = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", props.element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const iconName = !Array.isArray(props.element.content)
    ? props.element.content.icon || "Info"
    : "Info";

  // Find the exact Icon component dynamically. Convert inputs like "arrow-right" or "ArrowRight" to valid PascalCase.
  const formattedIconName = iconName
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (m) => m.toUpperCase());

  const IconComponent =
    (lucideIcons as any)[formattedIconName] || lucideIcons.Info;

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx(
        "p-6 w-full my-2 relative transition-all rounded-xl border border-muted bg-muted/20 flex items-center justify-center gap-4",
        {
          "border-blue-500! border-solid!":
            state.editor.selectedElement.id === props.element.id,
          "border-dashed border-slate-300": !state.editor.liveMode,
          "cursor-pointer": !state.editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "iconBlock")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <IconComponent size={64} className="text-primary" />

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg tracking-normal font-sans">
            <lucideIcons.Trash
              className="cursor-pointer text-white!"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default IconBlockComponent;
