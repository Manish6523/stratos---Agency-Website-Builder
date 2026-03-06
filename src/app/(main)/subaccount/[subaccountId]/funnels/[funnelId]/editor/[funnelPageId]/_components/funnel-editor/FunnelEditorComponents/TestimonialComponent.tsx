"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash, Quote } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const TestimonialComponent = (props: Props) => {
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

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx(
        "p-6 w-full my-2 relative text-[16px] transition-all bg-muted/50 rounded-xl flex flex-col gap-4",
        {
          "border-blue-500! border-solid!":
            state.editor.selectedElement.id === props.element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "testimonial")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <Quote size={32} className="text-muted-foreground/50" />
      <span
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        className="text-lg italic"
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: { innerText: spanElement.innerText },
              },
            },
          });
        }}
        dangerouslySetInnerHTML={{
          __html: !Array.isArray(props.element.content)
            ? (props.element.content.innerText ??
              "This is a great service! Highly recommended.")
            : "",
        }}
      />
      <div
        className="font-bold text-sm mt-2 outline-none"
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          const divElement = e.target as HTMLDivElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  ...(!Array.isArray(props.element.content)
                    ? props.element.content
                    : {}),
                  authorName: divElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(props.element.content)
          ? props.element.content.authorName || "- Author Name"
          : "- Author Name"}
      </div>

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

export default TestimonialComponent;
