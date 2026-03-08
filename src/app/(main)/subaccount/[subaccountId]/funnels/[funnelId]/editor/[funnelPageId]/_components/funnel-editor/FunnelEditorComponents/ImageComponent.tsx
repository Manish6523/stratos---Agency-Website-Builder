"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const ImageComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const styles = props.element.styles;

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

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

  const src = !Array.isArray(props.element.content)
    ? props.element.content.src ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

  // Using standard img tag instead of Next Image since users provide dynamic untrusted URLs and sizes
  return (
    <div
      id={props.element.id}
      className={clsx(
        "p-[2px] w-full my-[5px] relative transition-all flex items-center justify-center",
        {
          "border-blue-500!":
            state.editor.selectedElement.id === props.element.id,
          "border-solid!": state.editor.selectedElement.id === props.element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "image")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg z-50 tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="User uploaded image"
        style={styles}
        className="w-full object-cover"
        draggable={false}
      />

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! z-50 tracking-normal font-sans">
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

export default ImageComponent;
