"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/providers/editor/editor-provider";
import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {};

const AiBuilderTab = (props: Props) => {
  const { state, dispatch } = useEditor();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      const isSpecificSelected =
        state.editor.selectedElement.id !== "__body" &&
        state.editor.selectedElement.type !== null;

      const response = await fetch("/api/generate-layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          selectedElement: isSpecificSelected
            ? state.editor.selectedElement
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate layout");
      }

      // If the AI kept the exact same ID, it's an update. Otherwise, it's a new element.
      if (
        isSpecificSelected &&
        data.element.id === state.editor.selectedElement.id
      ) {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            elementDetails: data.element,
          },
        });
        toast.success("Element updated successfully!");
      } else {
        // Add the generated element to the current container or body
        const targetContainerId =
          state.editor.selectedElement.type === "container" ||
          state.editor.selectedElement.type === "2Col"
            ? state.editor.selectedElement.id
            : "__body";

        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: targetContainerId,
            elementDetails: data.element,
          },
        });
        toast.success("Layout generated successfully!");
      }

      setPrompt("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to generate layout");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-4 h-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="text-primary w-5 h-5" />
          AI Builder
        </h3>
        <p className="text-sm text-muted-foreground">
          {state.editor.selectedElement.id !== "__body" &&
          state.editor.selectedElement.type !== null
            ? `Describe how you want to modify the selected ${state.editor.selectedElement.name} element, or what to add inside.`
            : "Describe the section you want to build and AI will generate the layout and copy for you."}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-muted-foreground">Prompt</Label>
        <textarea
          className="w-full bg-background border p-3 rounded-md h-32 text-sm resize-none"
          placeholder="e.g. A dark pricing section with 3 columns, a catchy title, and 'Buy Now' buttons..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 mt-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Building...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Section
          </>
        )}
      </Button>

      {state.editor.selectedElement.id !== "__body" &&
        state.editor.selectedElement.type !== null && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            The AI will update the currently selected element. To generate a
            completely new section, select the Body element first.
          </p>
        )}
    </div>
  );
};

export default AiBuilderTab;
