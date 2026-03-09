"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const HeadingComponent = (props: Props) => {
  const { dispatch, state } = useEditor();

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

  const styles = props.element.styles;

  // Determine which semantic tag to use
  let Tag: React.ElementType = "h1";
  if (props.element.type === "h2") Tag = "h2";
  if (props.element.type === "h3") Tag = "h3";

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx("p-[2px] w-fit my-[5px] relative transition-all", {
        "border-blue-500!":
          state.editor.selectedElement.id === props.element.id,
        "border-solid!": state.editor.selectedElement.id === props.element.id,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, props.element.type as string)}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg z-50 tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <Tag
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        className="w-full outline-none!"
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          const target = e.target as HTMLElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  ...props.element.content,
                  innerText: target.innerText,
                },
              },
            },
          });
        }}
        dangerouslySetInnerHTML={{
          __html: !Array.isArray(props.element.content)
            ? (props.element.content.innerText ?? "")
            : "",
        }}
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

export default HeadingComponent;
