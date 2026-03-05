import { Code } from "lucide-react";
import React from "react";

const CustomEmbedPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "customEmbed");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <Code size={40} className="text-muted-foreground" />
    </div>
  );
};

export default CustomEmbedPlaceholder;
