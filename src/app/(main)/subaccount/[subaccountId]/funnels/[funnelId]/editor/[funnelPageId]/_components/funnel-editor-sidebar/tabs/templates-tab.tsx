"use client";

import React, { useState } from "react";
import { templates } from "@/lib/templates";
import { useEditor } from "@/providers/editor/editor-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CopyPlus, LayoutTemplate } from "lucide-react";
import Image from "next/image";

type Props = {};

export default function TemplatesTab({}: Props) {
  const { state, dispatch } = useEditor();
  const [selectedTemplate, setSelectedTemplate] = useState<{
    name: string;
    elements: any[];
    imageUrl?: string;
  } | null>(null);

  const handleTemplateClick = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template);
  };

  const handleAppend = () => {
    if (!selectedTemplate) return;

    selectedTemplate.elements.forEach((element) => {
      dispatch({
        type: "ADD_ELEMENT",
        payload: {
          containerId: "__body",
          elementDetails: element,
        },
      });
    });

    setSelectedTemplate(null);
  };

  const handleReplace = () => {
    if (!selectedTemplate) return;

    const bodyElement = state.editor.elements.find((el) => el.id === "__body");
    if (bodyElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...bodyElement,
            content: selectedTemplate.elements,
          },
        },
      });
    }

    setSelectedTemplate(null);
  };

  const groupedTemplates = templates.reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    },
    {} as Record<string, typeof templates>,
  );

  return (
    <>
      <div className="flex flex-col gap-4 px-2 pb-2 w-full">
        <p className="text-xs text-muted-foreground mb-2">
          Click a template to instantly generate a pre-built UI on your canvas.
        </p>

        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={Object.keys(groupedTemplates)}
        >
          {Object.entries(groupedTemplates).map(
            ([category, categoryTemplates]) => (
              <AccordionItem
                key={category}
                value={category}
                className="border-b-0 px-0 py-0"
              >
                <AccordionTrigger className="no-underline! hover:text-primary transition-colors hover:bg-muted/50 rounded-md px-2 py-3 mb-2">
                  {category}
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 gap-4 pb-4">
                  {categoryTemplates.map((template) => (
                    <div
                      key={template.name}
                      onClick={() => handleTemplateClick(template)}
                      className="group flex flex-col cursor-pointer overflow-hidden border border-border/50 rounded-lg hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all bg-background"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-video w-full bg-muted/30 overflow-hidden border-b border-border/50 flex items-center justify-center">
                        {template.imageUrl ? (
                          <Image
                            src={template.imageUrl}
                            alt={template.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">
                            <LayoutTemplate className="w-10 h-10" />
                            <span className="text-[10px] uppercase tracking-wider font-medium">
                              Preview Unavailable
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3">
                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                          {template.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </div>

      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-md z-100">
          <DialogHeader>
            <DialogTitle>Insert "{selectedTemplate?.name}"</DialogTitle>
            <DialogDescription>
              Choose how you want to add this template.
            </DialogDescription>
          </DialogHeader>

          {/* Dialog Image Fallback - Now using Next/Image */}
          <div className="relative w-full aspect-video rounded-md overflow-hidden border border-border bg-muted/20 flex items-center justify-center">
            {selectedTemplate?.imageUrl ? (
              <Image
                src={selectedTemplate.imageUrl}
                alt="Template Preview"
                fill
                className="object-cover"
              />
            ) : (
              <LayoutTemplate className="w-12 h-12 text-muted-foreground/40" />
            )}
          </div>

          <div className="flex flex-col gap-3 py-2">
            <Button
              variant="default"
              className="w-full flex justify-start items-center gap-4 p-5 h-auto"
              onClick={handleReplace}
            >
              <LayoutTemplate className="w-5 h-5" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-sm">
                  Replace Current Canvas
                </span>
                <span className="text-[11px] opacity-80 font-normal leading-tight">
                  Wipes your current work and starts fresh
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full flex justify-start items-center gap-4 group p-5 h-auto"
              onClick={handleAppend}
            >
              <CopyPlus className="w-5 h-5 text-primary" />
              <div className="flex flex-col items-start text-left ">
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                  Append to Bottom
                </span>
                <span className="text-[11px] text-muted-foreground font-normal leading-tight">
                  Keep your design and add this below it
                </span>
              </div>
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setSelectedTemplate(null)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}