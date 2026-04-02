import React from "react";

const ThreeColumnsPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "3Col");
      }}
      className="h-14 w-14 bg-muted/70 rounded-lg p-2 px-1 flex flex-row gap-[4px]"
    >
      <div className="border-dashed border-2 h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-2 h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-2 h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
    </div>
  );
};

export default ThreeColumnsPlaceholder;
