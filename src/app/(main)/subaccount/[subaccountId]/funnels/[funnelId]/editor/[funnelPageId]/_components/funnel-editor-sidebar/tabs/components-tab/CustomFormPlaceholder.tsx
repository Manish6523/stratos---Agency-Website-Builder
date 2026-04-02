import { LayoutTemplate } from "lucide-react";
import React from "react";

const CustomFormPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("componentType", "customForm");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <LayoutTemplate className="size-7 text-muted-foreground" />
    </div>
  );
};

export default CustomFormPlaceholder;
