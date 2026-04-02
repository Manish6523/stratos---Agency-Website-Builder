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
      className="h-14 w-14 bg-muted/70 rounded-lg p-2 px-1 flex flex-col gap-[2px]"
    >
      <div className="flex flex-row gap-[2px]">
        <div className="border-dashed border-2 p-2 rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
        <div className="border-dashed border-2 p-2 rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      </div>
      <div className="border-dashed border-2 p-2 rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
    </div>
  );
};

export default GridPlaceholder;
