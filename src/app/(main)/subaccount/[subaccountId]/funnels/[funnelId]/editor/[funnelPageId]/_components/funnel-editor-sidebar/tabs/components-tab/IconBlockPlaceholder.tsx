import { EditorBtns } from "@/lib/constants";
import { Component } from "lucide-react";
import React from "react";

type Props = {};

const IconBlockPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, "iconBlock");
      }}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center"
    >
      <Component size={20} className="text-muted-foreground" />
    </div>
  );
};

export default IconBlockPlaceholder;
