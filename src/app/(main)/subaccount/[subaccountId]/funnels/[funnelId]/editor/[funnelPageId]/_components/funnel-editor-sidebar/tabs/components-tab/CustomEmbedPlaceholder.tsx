import { Code } from "lucide-react";
import React from "react";

const CustomEmbedPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "customEmbed");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <Code size={20} className="text-muted-foreground" />
    </div>
  );
};

export default CustomEmbedPlaceholder;
