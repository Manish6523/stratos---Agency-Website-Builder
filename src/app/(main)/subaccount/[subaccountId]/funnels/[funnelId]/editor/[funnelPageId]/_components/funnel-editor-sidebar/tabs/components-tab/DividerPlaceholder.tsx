import { Minus } from "lucide-react";
import React from "react";

const DividerPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "divider");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <Minus size={20} className="text-muted-foreground" />
    </div>
  );
};

export default DividerPlaceholder;
