"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const TextComponent = (props: Props) => {
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

  //WE ARE NOT ADDING DRAG DROP
  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx(
        "p-[2px] w-fit my-[5px] relative text-[16px] transition-all",
        {
          "border-blue-500!":
            state.editor.selectedElement.id === props.element.id,

          "border-solid!": state.editor.selectedElement.id === props.element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "text")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <span
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
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
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! tracking-normal font-sans">
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

export default TextComponent;
