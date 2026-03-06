"use client";
import { EditorBtns } from "@/lib/constants";
import { EditorAction } from "./editor-actions";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { FunnelPage } from "../../../generated/prisma/client";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string;
        src?: string;
        customCode?: string;
        alt?: string;
        authorName?: string;
        icon?: string;
        title?: string;
        sliderImages?: string[];
        progressValue?: number;
        progressColor?: string;
        progressBackground?: string;
      };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  sidebarOpen: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  sidebarOpen: true,
  funnelPageId: "",
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Add Element editor State",
    );
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      if (typeof action.payload.insertIndex === "number") {
        const newContent = [...item.content];
        newContent.splice(
          action.payload.insertIndex,
          0,
          action.payload.elementDetails,
        );
        return {
          ...item,
          content: newContent,
        };
      }
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Delete Element editor State",
    );
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return true;
  });
};

const findAnElement = (
  editorArray: EditorElement[],
  elementId: string,
): EditorElement | null => {
  for (const item of editorArray) {
    if (item.id === elementId) return item;
    if (item.content && Array.isArray(item.content)) {
      const found = findAnElement(item.content, elementId);
      if (found) return found;
    }
  }
  return null;
};

const isDescendant = (element: EditorElement, targetId: string): boolean => {
  if (element.id === targetId) return true;
  if (element.content && Array.isArray(element.content)) {
    return element.content.some((child) => isDescendant(child, targetId));
  }
  return false;
};

const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
      ];

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;

    case "UPDATE_ELEMENT":
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(state.editor.elements, action);

      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ];
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };
      return updatedEditor;

    case "DELETE_ELEMENT":
      // Perform your logic to delete the element from the state
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action,
      );
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete }, // Save a copy of the updated state
      ];

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deletedState;

    case "MOVE_ELEMENT":
      const elementToMove = findAnElement(
        state.editor.elements,
        action.payload.elementId,
      );
      if (!elementToMove) return state;

      // Check to prevent dropping a container into itself or its own children
      if (isDescendant(elementToMove, action.payload.newContainerId))
        return state;

      // First delete it from current location to prevent duplicate IDs
      const stateAfterDelete = deleteAnElement(state.editor.elements, {
        type: "DELETE_ELEMENT",
        payload: { elementDetails: elementToMove },
      });

      // Then add it to the new container location
      const stateAfterMove = addAnElement(stateAfterDelete, {
        type: "ADD_ELEMENT",
        payload: {
          containerId: action.payload.newContainerId,
          elementDetails: elementToMove,
          insertIndex: action.payload.insertIndex,
        },
      });

      const updatedEditorStateAfterMove = {
        ...state.editor,
        elements: stateAfterMove,
      };

      const updatedHistoryAfterMove = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterMove },
      ];

      return {
        ...state,
        editor: updatedEditorStateAfterMove,
        history: {
          ...state.history,
          history: updatedHistoryAfterMove,
          currentIndex: updatedHistoryAfterMove.length - 1,
        },
      };

    case "CHANGE_CLICKED_ELEMENT":
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor }, // Save a copy of the current editor state
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return clickedState;
    case "CHANGE_DEVICE":
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
      return changedDeviceState;

    case "TOGGLE_PREVIEW_MODE":
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
      return toggleState;

    case "TOGGLE_SIDEBAR":
      const sidebarState = {
        ...state,
        editor: {
          ...state.editor,
          sidebarOpen: !state.editor.sidebarOpen,
        },
      };
      return sidebarState;

    case "TOGGLE_LIVE_MODE":
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      };
      return toggleLiveMode;

    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: {
            ...nextEditorState,
            previewMode: state.editor.previewMode,
            liveMode: state.editor.liveMode,
            device: state.editor.device,
            sidebarOpen: state.editor.sidebarOpen,
          },
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: {
            ...prevEditorState,
            previewMode: state.editor.previewMode,
            liveMode: state.editor.liveMode,
            device: state.editor.device,
            sidebarOpen: state.editor.sidebarOpen,
          },
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;

    case "LOAD_DATA":
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      };

    case "SET_FUNNELPAGE_ID":
      const { funnelPageId } = action.payload;
      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        funnelPageId,
      };

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId }, // Save a copy of the updated state
      ];

      const funnelPageIdState = {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      };
      return funnelPageIdState;

    default:
      return state;
  }
};

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  subaccountId: string;
  funnelId: string;
  pageDetails: FunnelPage | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  subaccountId: "",
  funnelId: "",
  pageDetails: null,
});

type Props = {
  children: React.ReactNode;
  subaccountId: string;
  funnelId: string;
  pageDetails: FunnelPage;
};

export default function EditorProvider({
  children,
  subaccountId,
  funnelId,
  pageDetails,
}: Props) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        subaccountId: subaccountId,
        funnelId: funnelId,
        pageDetails: pageDetails,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};
