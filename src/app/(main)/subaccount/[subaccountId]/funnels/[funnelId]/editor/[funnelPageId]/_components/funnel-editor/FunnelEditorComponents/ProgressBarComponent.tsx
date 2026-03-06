"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const ProgressBarComponent = (props: Props) => {
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

  // Consume custom progressValue and colors
  const progressValue =
    !Array.isArray(props.element.content) &&
    props.element.content.progressValue !== undefined
      ? props.element.content.progressValue
      : 50;

  const progressColor = !Array.isArray(props.element.content)
    ? props.element.content.progressColor || "bg-primary"
    : "bg-primary";

  const progressBackground = !Array.isArray(props.element.content)
    ? props.element.content.progressBackground || "bg-secondary"
    : "bg-secondary";

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx("p-4 w-full my-2 relative transition-all", {
        "border-blue-500! border-solid!":
          state.editor.selectedElement.id === props.element.id,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "progressBar")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div
        className={clsx(
          "w-full rounded-full h-4 overflow-hidden dark:bg-gray-700",
          {
            [progressBackground]: progressBackground.startsWith("bg-"),
          },
        )}
        style={
          !progressBackground.startsWith("bg-")
            ? { backgroundColor: progressBackground }
            : {}
        }
      >
        <div
          className={clsx("h-4 rounded-full transition-all duration-500", {
            [progressColor]: progressColor.startsWith("bg-"),
          })}
          style={{
            width: `${Math.min(100, Math.max(0, progressValue))}%`,
            ...(!progressColor.startsWith("bg-")
              ? { backgroundColor: progressColor }
              : {}),
          }}
        ></div>
      </div>

      {!state.editor.liveMode && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
          <span>Progress: {progressValue}% (Edit in Custom Sidebar)</span>
        </div>
      )}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg tracking-normal font-sans">
            <Trash
              className="cursor-pointer text-white!"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default ProgressBarComponent;
