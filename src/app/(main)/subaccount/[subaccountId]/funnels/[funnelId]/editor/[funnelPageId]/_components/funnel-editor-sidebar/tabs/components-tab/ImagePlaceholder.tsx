import { Image } from "lucide-react";
import React from "react";

const ImagePlaceholder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", "image");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-drag"
    >
      <Image size={40} className="text-muted-foreground" />
    </div>
  );
};

export default ImagePlaceholder;
