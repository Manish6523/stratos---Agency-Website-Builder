import { EditorBtns } from "@/lib/constants";
import { FastForward } from "lucide-react";
import React from "react";

type Props = {};

const ProgressBarPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, "progressBar");
      }}
      className=" h-10 w-10 bg-muted rounded-lg flex items-center justify-center p-2"
    >
      <div className="w-full h-4 border border-muted-foreground rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-muted-foreground"></div>
      </div>
    </div>
  );
};

export default ProgressBarPlaceholder;
