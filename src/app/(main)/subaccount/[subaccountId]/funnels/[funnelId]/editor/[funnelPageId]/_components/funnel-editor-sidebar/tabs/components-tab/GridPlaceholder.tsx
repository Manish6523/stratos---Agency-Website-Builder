import { LayoutGrid } from "lucide-react";
import React from "react";

type Props = {};

const GridPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "grid");
      }}
      className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" className="text-muted-foreground">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" />
      </svg>
    </div>
  );
};

export default GridPlaceholder;
