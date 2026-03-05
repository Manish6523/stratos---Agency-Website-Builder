import { Minus } from "lucide-react";
import React from "react";

const DividerPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "divider");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <Minus size={40} className="text-muted-foreground" />
    </div>
  );
};

export default DividerPlaceholder;
