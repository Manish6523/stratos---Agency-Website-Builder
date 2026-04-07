import { MousePointerClick } from "lucide-react";
import React from "react";

const ButtonPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "button");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <MousePointerClick size={20} className="text-muted-foreground" />
    </div>
  );
};

export default ButtonPlaceholder;
