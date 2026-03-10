"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";
import { v4 } from "uuid";
import Recursive from "./Recursive";
import { Trash, Plus } from "lucide-react";

type Props = { element: EditorElement };

const GridContainer = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    const componentId = e.dataTransfer.getData("componentId");

    let insertIndex = Array.isArray(content) ? content.length : 0;

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

    // Usually users drop standard elements into the Grid cells, not directly into the Grid root.
    // However, if they drop a container, we just append it as a new cell.
    switch (componentType) {
      case "container":
      case "2Col":
      case "3Col":
      case "grid":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles, width: "100%" },
              type: "container",
            },
            insertIndex,
          },
        });
        break;
      default:
        // Basic fallback: if they drop a standard component (text, image, etc),
        // we wrap it in a container automatically so it acts as a proper grid cell.
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles, width: "100%" },
              type: "container",
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
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleAddGridCell = () => {
    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        containerId: element.id,
        elementDetails: {
          content: [],
          id: v4(),
          name: "Container",
          styles: { ...defaultStyles, width: "100%" },
          type: "container",
        },
        insertIndex: Array.isArray(element.content)
          ? element.content.length
          : 0,
      },
    });
  };

  return (
    <div
      style={styles}
      id={id}
      className={clsx("relative p-2 transition-all group", {
        "max-w-full w-full": true,
        "h-fit": true,
        "border-blue-500!":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-solid!":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "grid")}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-px rounded-none rounded-t-lg hidden tracking-normal font-sans",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          },
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg tracking-normal font-sans flex items-center gap-2">
            <Plus
              size={16}
              onClick={handleAddGridCell}
              className="text-white! cursor-pointer hover:opacity-80 transition-opacity"
            //   title="Add Grid Cell"
            />
            <Trash
              size={16}
              onClick={handleDeleteElement}
              className="text-white! cursor-pointer hover:opacity-80 transition-opacity"
            //   title="Delete Grid"
            />
          </div>
        )}
    </div>
  );
};

export default GridContainer;
