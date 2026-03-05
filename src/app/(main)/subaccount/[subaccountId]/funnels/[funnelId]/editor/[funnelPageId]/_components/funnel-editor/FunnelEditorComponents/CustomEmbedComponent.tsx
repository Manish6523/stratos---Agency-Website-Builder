"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const CustomEmbedComponent = (props: Props) => {
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
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", props.element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const embedContent =
    !Array.isArray(props.element.content) && props.element.content.customCode
      ? props.element.content.customCode
      : "<div class='p-4 bg-muted text-center text-muted-foreground'>Custom Embed: Add HTML in Settings > Custom</div>";

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx("p-[2px] w-full my-[5px] relative transition-all", {
        "border-blue-500!":
          state.editor.selectedElement.id === props.element.id,
        "border-solid!": state.editor.selectedElement.id === props.element.id,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "customEmbed")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg z-50 tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div
        dangerouslySetInnerHTML={{
          __html: embedContent,
        }}
        className="w-full h-full pointer-events-none"
        // We use pointer-events-none in the editor so clicking the embed selects it rather than interacting with the iframe/code.
        // But in live mode, pointer events will be enabled.
        style={{ pointerEvents: state.editor.liveMode ? "auto" : "none" }}
      />

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! z-50">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default CustomEmbedComponent;
