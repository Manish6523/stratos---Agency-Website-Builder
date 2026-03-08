"use client";
import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const SliderComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", props.element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const sliderImages = !Array.isArray(props.element.content)
    ? props.element.content.sliderImages || []
    : [];

  const hasImages = sliderImages.length > 0;
  const safeIndex = currentIndex >= sliderImages.length ? 0 : currentIndex;
  const currentImage = hasImages ? sliderImages[safeIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) =>
        prev === 0 ? sliderImages.length - 1 : prev - 1,
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1,
      );
    }
  };

  return (
    <div
      style={styles}
      id={props.element.id}
      className={clsx(
        "w-full my-2 relative transition-all rounded-xl border border-muted bg-muted/20 flex flex-col items-center justify-center p-8 aspect-video",
        {
          "border-blue-500! border-solid!":
            state.editor.selectedElement.id === props.element.id,
          "border-dashed border-slate-300": !state.editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onDragStart={(e) => handleDragStart(e, "slider")}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-px rounded-none rounded-t-lg tracking-normal font-sans z-10">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md cursor-pointer text-muted-foreground z-10 hover:bg-background"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </div>

      <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 w-full h-full relative z-0">
        {hasImages ? (
          <img
            src={currentImage as string}
            alt="Slider Display"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            draggable={false}
          />
        ) : (
          <>
            <ImageIcon size={48} className="opacity-50" />
            <span className="font-semibold opacity-70">Image Slider Block</span>
            <span className="text-xs opacity-50 block max-w-[250px] text-center">
              (Add image URLs in the Custom settings tab on the right to reveal
              images)
            </span>
          </>
        )}
      </div>

      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md cursor-pointer text-muted-foreground z-10 hover:bg-background"
        onClick={handleNext}
      >
        <ChevronRight />
      </div>

      <div className="absolute bottom-4 flex gap-2 justify-center w-full z-10">
        {hasImages ? (
          sliderImages.map((_, i) => (
            <div
              key={i}
              className={clsx("w-2 h-2 rounded-full", {
                "bg-primary/80": i === safeIndex,
                "bg-muted-foreground/30": i !== safeIndex,
              })}
            ></div>
          ))
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-primary/80"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          </>
        )}
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg tracking-normal font-sans z-10">
            <Trash
              className="cursor-pointer text-white!"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default SliderComponent;
