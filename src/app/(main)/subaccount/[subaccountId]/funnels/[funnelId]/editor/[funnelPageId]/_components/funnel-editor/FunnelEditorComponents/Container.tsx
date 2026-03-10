"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";
import { v4 } from "uuid";
import Recursive from "./Recursive";
import { Trash } from "lucide-react";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

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
            styles?.display === "flex" && styles?.flexDirection === "row";

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
              content: { innerText: "Text Element" },
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
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Link Element",
                href: "#",
              },
              id: v4(),
              name: "Link",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "link",
            },
            insertIndex,
          },
        });
        break;
      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://www.youtube.com/embed/Aq5WXmQQooo?si=eR15wt_cqSsE09_P",
              },
              id: v4(),
              name: "Video",
              styles: {},
              type: "video",
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
      case "contactForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "contactForm",
            },
            insertIndex,
          },
        });
        break;
      case "paymentForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "paymentForm",
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
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
            },
            insertIndex,
          },
        });
        break;
      case "3Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Three Columns",
              styles: { ...defaultStyles, display: "flex" },
              type: "3Col",
            },
          },
        });
        break;
      case "grid":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Grid",
              styles: {
                ...defaultStyles,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                width: "100%",
              },
              type: "grid",
            },
            insertIndex,
          },
        });
        break;
      case "divider":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Divider",
              styles: { ...defaultStyles },
              type: "divider",
            },
          },
        });
        break;
      case "button":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Click me", href: "#" },
              id: v4(),
              name: "Button",
              styles: {
                ...defaultStyles,
                backgroundColor: "#2563eb",
                color: "white",
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingLeft: "16px",
                paddingRight: "16px",
                borderRadius: "6px",
                display: "inline-block",
              },
              type: "button",
            },
          },
        });
        break;
      case "customEmbed":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { customCode: "" },
              id: v4(),
              name: "Custom Embed",
              styles: { ...defaultStyles, width: "100%" },
              type: "customEmbed",
            },
            insertIndex,
          },
        });
        break;
      case "h1":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Heading 1" },
              id: v4(),
              name: "Heading 1",
              styles: {
                ...defaultStyles,
                fontSize: "40px",
                fontWeight: "bold",
              },
              type: "h1",
            },
            insertIndex,
          },
        });
        break;
      case "h2":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Heading 2" },
              id: v4(),
              name: "Heading 2",
              styles: {
                ...defaultStyles,
                fontSize: "32px",
                fontWeight: "bold",
              },
              type: "h2",
            },
            insertIndex,
          },
        });
        break;
      case "h3":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Heading 3" },
              id: v4(),
              name: "Heading 3",
              styles: {
                ...defaultStyles,
                fontSize: "24px",
                fontWeight: "bold",
              },
              type: "h3",
            },
            insertIndex,
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
              },
              id: v4(),
              name: "Image",
              styles: { ...defaultStyles, width: "100%", height: "auto" },
              type: "image",
            },
            insertIndex,
          },
        });
        break;
      case "testimonial":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "This is a fantastic tool that changed my agency!",
              },
              id: v4(),
              name: "Testimonial",
              styles: { ...defaultStyles },
              type: "testimonial",
            },
            insertIndex,
          },
        });
        break;
      case "progressBar":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "75" },
              id: v4(),
              name: "Progress Bar",
              styles: { ...defaultStyles },
              type: "progressBar",
            },
            insertIndex,
          },
        });
        break;
      case "slider":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { sliderImages: [] },
              id: v4(),
              name: "Slider",
              styles: { ...defaultStyles, width: "100%" },
              type: "slider",
            },
            insertIndex,
          },
        });
        break;
      case "iconBlock":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { icon: "Info", strokeWidth: "2" },
              id: v4(),
              name: "Icon Block",
              styles: { ...defaultStyles, fontSize: "48px" },
              type: "iconBlock",
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

  return (
    <div
      style={styles}
      id={id}
      className={clsx("relative p-2 transition-all group", {
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "overflow-auto ": type === "__body",
        "flex flex-col md:flex-row!": type === "2Col",
        "border-blue-500!":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "border-yellow-400! border-4!":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "border-solid!":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={
        type !== "__body" && !state.editor.liveMode && !state.editor.previewMode
      }
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
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
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-px rounded-none rounded-t-lg tracking-normal font-sans">
            <Trash
              size={16}
              onClick={handleDeleteElement}
              className="text-white!"
            />
          </div>
        )}
    </div>
  );
};

export default Container;
