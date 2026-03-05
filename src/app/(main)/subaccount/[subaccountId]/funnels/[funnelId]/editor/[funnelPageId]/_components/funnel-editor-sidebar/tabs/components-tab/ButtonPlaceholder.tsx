import { MousePointerClick } from "lucide-react";
import React from "react";

const ButtonPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "button");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <MousePointerClick size={40} className="text-muted-foreground" />
    </div>
  );
};

export default ButtonPlaceholder;
