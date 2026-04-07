import React from "react";

const H3Placeholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "h3");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex flex-col items-center justify-center cursor-drag"
    >
      <span className="text-muted-foreground font-bold text-lg">H3</span>
    </div>
  );
};

export default H3Placeholder;
