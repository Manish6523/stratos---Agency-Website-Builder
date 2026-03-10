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
      className="h-10 w-10 bg-muted/70 rounded-md p-2 flex flex-row gap-[4px] border border-border/50 hover:bg-muted transition-all"
    >
      <LayoutGrid size={40} className="text-muted-foreground" />
    </div>
  );
};

export default GridPlaceholder;
