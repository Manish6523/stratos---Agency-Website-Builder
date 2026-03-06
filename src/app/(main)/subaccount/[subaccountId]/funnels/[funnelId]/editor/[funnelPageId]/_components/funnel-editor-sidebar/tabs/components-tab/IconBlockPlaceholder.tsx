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
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Component size={40} className="text-muted-foreground" />
    </div>
  );
};

export default IconBlockPlaceholder;
