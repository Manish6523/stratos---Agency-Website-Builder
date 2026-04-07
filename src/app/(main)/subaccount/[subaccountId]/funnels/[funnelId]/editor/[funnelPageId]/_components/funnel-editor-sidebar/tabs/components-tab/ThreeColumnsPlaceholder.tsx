import React from "react";

const ThreeColumnsPlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "3Col");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" className="text-muted-foreground">
        <rect x="2" y="3" width="6" height="18" rx="2" />
        <rect x="9" y="3" width="6" height="18" rx="2" />
        <rect x="16" y="3" width="6" height="18" rx="2" />
      </svg>
    </div>
  );
};

export default ThreeColumnsPlaceholder;
