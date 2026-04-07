import { Type } from "lucide-react";
import React from "react";

const H1Placeholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "h1");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex flex-col items-center justify-center cursor-drag"
    >
      <span className="text-muted-foreground font-bold text-2xl">H1</span>
    </div>
  );
};

export default H1Placeholder;
