import React from "react";

const H2Placeholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "h2");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex flex-col items-center justify-center cursor-drag"
    >
      <span className="text-muted-foreground font-bold text-xl">H2</span>
    </div>
  );
};

export default H2Placeholder;
