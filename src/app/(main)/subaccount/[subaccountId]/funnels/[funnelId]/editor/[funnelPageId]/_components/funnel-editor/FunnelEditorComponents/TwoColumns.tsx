"use client";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import React from "react";
import RecursiveElement from "./Recursive";

import { v4 } from "uuid";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { Trash } from "lucide-react";

type Props = {
  element: EditorElement;
};

const TwoColumns = (props: Props) => {
  const { id, content, type } = props.element;
  const { dispatch, state } = useEditor();
  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    const componentId = e.dataTransfer.getData("componentId");

    let insertIndex = Array.isArray(content) ? content.length : 0;
    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        const el = document.getElementById(content[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const isTopHalf = e.clientY < rect.top + rect.height / 2;
          const isRow =
            props.element.styles?.display === "flex" &&
            props.element.styles?.flexDirection === "row";

          if (isRow) {
            const isLeftHalf = e.clientX < rect.left + rect.width / 2;
            if (isLeftHalf) {
              insertIndex = i;
              break;
            }
          } else {
            if (isTopHalf) {
              insertIndex = i;
              break;
            }
          }
        }
      }
    }

    if (componentId) {
      dispatch({
        type: "MOVE_ELEMENT",
        payload: {
          elementId: componentId,
          newContainerId: id,
          insertIndex,
        },
      });
      return;
    }

    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Component" },
              id: v4(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
            insertIndex,
          },
        });
        break;
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles },
              type: "container",
            },
            insertIndex,
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles },
              type: "2Col",
            },
            insertIndex,
          },
        });
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", id);
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

  return (
    <div
      style={props.element.styles}
      className={clsx("relative p-4 transition-all", {
        "h-fit": type === "container",
        "h-full": type === "__body",
        "m-4": type === "container",
        "border-blue-500!":
          state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode,
        "border-solid!":
          state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      id={id}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={
        type !== "__body" && !state.editor.liveMode && !state.editor.previewMode
      }
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! tracking-normal font-sans">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
      {Array.isArray(content) &&
        content.map((childElement) => (
          <RecursiveElement key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default TwoColumns;
