"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from "lucide-react";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/providers/editor/editor-provider";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {};

export default function SettingsTab({}: Props) {
  const { state, dispatch } = useEditor();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const TABS_TRIGGER_CLASS =
    "cursor-pointer w-10 h-10 p-0 data-[state=active]:bg-muted";
  const ACCORDIAN_TIRGGER_CLASS = "no-underline! cursor-pointer";
  const TABLIST_CLASS =
    "flex items-center flex-row justify-between border rounded-md bg-transparent h-fit gap-4";

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleGenerateText = async () => {
    if (!aiPrompt) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate text");
      }

      // Update the element text
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...state.editor.selectedElement,
            content: {
              ...state.editor.selectedElement.content,
              innerText: data.text,
            },
          },
        },
      });

      toast.success("Text generated successfully");
      setAiPrompt("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to generate text");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={[
        "AI Assistant",
        "Typography",
        "Dimensions",
        "Decorations",
        "Flexbox",
      ]}
    >
      {(state.editor.selectedElement.type === "text" ||
        state.editor.selectedElement.type === "h1" ||
        state.editor.selectedElement.type === "h2" ||
        state.editor.selectedElement.type === "h3" ||
        state.editor.selectedElement.type === "link") && (
        <AccordionItem value="AI Assistant" className="px-6 py-0 border-y">
          <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
            <div className="flex items-center gap-2">
              <Wand2 size={16} className="text-primary" />
              AI Assistant
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs mb-2">
              Generate content using Google Gemini
            </p>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Prompt</Label>
              <textarea
                className="w-full bg-background border p-2 rounded-md h-24 text-sm"
                placeholder="E.g. Write a catchy headline for a real estate agency..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <Button
                onClick={handleGenerateText}
                className="w-full mt-2"
                disabled={isGenerating || !aiPrompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Text
                  </>
                )}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Custom
        </AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https:domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href || ""}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "video" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Video URL</p>
                <Input
                  id="src"
                  placeholder="embedded video url"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.src || ""}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "image" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Image Source</p>
                <Input
                  id="src"
                  placeholder="https://images.unsplash.com/..."
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.src || ""}
                />
                <p className="text-muted-foreground mt-2">Alt Text</p>
                <Input
                  id="alt"
                  placeholder="Description for screen readers"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.alt || ""}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "customEmbed" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Custom HTML/JS</p>
                <textarea
                  id="customCode"
                  className="w-full bg-background border p-2 rounded-md h-32 text-sm font-mono"
                  placeholder="<div>Hello World</div>"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.customCode || ""}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0  border-y">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 ">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.textAlign || ""}
            >
              <TabsList className={TABLIST_CLASS}>
                <TabsTrigger value="left" className={TABS_TRIGGER_CLASS}>
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger value="right" className={TABS_TRIGGER_CLASS}>
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger value="center" className={TABS_TRIGGER_CLASS}>
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger value="justify" className={TABS_TRIGGER_CLASS}>
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Select
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "fontFamily",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.fontFamily || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fonts</SelectLabel>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                  <SelectItem value="DM Sans">DM Sans</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">
                    Times New Roman
                  </SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.color || ""}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "fontWeight",
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontSize || ""}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Line Height</Label>
              <Input
                placeholder="px/em"
                id="lineHeight"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.lineHeight || ""}
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Letter Spacing</Label>
              <Input
                placeholder="px"
                id="letterSpacing"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.letterSpacing || ""}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Transform</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "textTransform",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.textTransform || ""}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="uppercase">Uppercase</SelectItem>
                    <SelectItem value="lowercase">Lowercase</SelectItem>
                    <SelectItem value="capitalize">Capitalize</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Decoration</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "textDecoration",
                      value: e,
                    },
                  })
                }
                value={
                  state.editor.selectedElement.styles.textDecoration?.toString() ||
                  ""
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="underline">Underline</SelectItem>
                    <SelectItem value="line-through">Line-through</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className=" px-6 py-0 ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.height || ""}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.width || ""}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Max W</Label>
                    <Input
                      id="maxWidth"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.maxWidth || ""}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Min W</Label>
                    <Input
                      placeholder="px"
                      id="minWidth"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.minWidth || ""}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Max H</Label>
                    <Input
                      id="maxHeight"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.maxHeight || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Min H</Label>
                    <Input
                      placeholder="px"
                      id="minHeight"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.minHeight || ""
                      }
                    />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginTop || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="marginBottom"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginBottom || ""
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginLeft || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="marginRight"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginRight || ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingTop || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingBottom || ""
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingLeft || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="paddingRight"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingRight || ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0 ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.opacity ===
                "number"
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || "0"
                      ).replace("%", ""),
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "opacity",
                    value: `${e[0]}%`,
                  },
                });
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.opacity === "number"
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || "0"
                      ).replace("%", ""),
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof state.editor.selectedElement.styles?.borderRadius ===
                "number"
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || "0"
                      ).replace("px", ""),
                    ) || 0}
                px
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: `${e[0]}px`,
                  },
                });
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.borderRadius ===
                "number"
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || "0"
                      ).replace("%", ""),
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex  border rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="border-y-0! rounded-none border-r-0! mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={
                  state.editor.selectedElement.styles.backgroundColor || ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex  border rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="border-y-0! rounded-none border-r-0! mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={
                  state.editor.selectedElement.styles.backgroundImage || ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "backgroundSize",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.backgroundSize?.toString()}
            >
              <TabsList className={TABLIST_CLASS}>
                <TabsTrigger value="cover" className={TABS_TRIGGER_CLASS}>
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger value="contain" className={TABS_TRIGGER_CLASS}>
                  <AlignVerticalJustifyCenter size={22} />
                </TabsTrigger>
                <TabsTrigger value="auto" className={TABS_TRIGGER_CLASS}>
                  <LucideImageDown size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Border</Label>
            <div className="flex gap-4">
              <Input
                placeholder="1px"
                id="borderWidth"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderWidth || ""}
              />
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "borderStyle",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.borderStyle || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex  border rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.borderColor,
                }}
              />
              <Input
                placeholder="#000000"
                className="border-y-0! rounded-none border-r-0! mr-2"
                id="borderColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderColor || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Box Shadow</Label>
            <Input
              placeholder="0px 4px 6px rgba(0,0,0,0.1)"
              id="boxShadow"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.boxShadow || ""}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Position" className="px-6 py-0 ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Position
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Position</Label>
            <Select
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "position",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.position || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Static" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Top</Label>
              <Input
                placeholder="px/%"
                id="top"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.top || ""}
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Bottom</Label>
              <Input
                placeholder="px/%"
                id="bottom"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.bottom || ""}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Left</Label>
              <Input
                placeholder="px/%"
                id="left"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.left || ""}
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Right</Label>
              <Input
                placeholder="px/%"
                id="right"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.right || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Z-Index</Label>
            <Input
              placeholder="0"
              id="zIndex"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.zIndex || ""}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0  ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Flexbox
        </AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: "justifyContent",
                  value: e,
                },
              })
            }
            value={state.editor.selectedElement.styles.justifyContent || ""}
          >
            <TabsList className={TABLIST_CLASS}>
              <TabsTrigger value="space-between" className={TABS_TRIGGER_CLASS}>
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger value="space-evenly" className={TABS_TRIGGER_CLASS}>
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger value="center" className={TABS_TRIGGER_CLASS}>
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger value="start" className={TABS_TRIGGER_CLASS}>
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger value="end" className={TABS_TRIGGER_CLASS}>
                <AlignHorizontalJustifyEndIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Label className="text-muted-foreground mt-2">Align Items</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: "alignItems",
                  value: e,
                },
              })
            }
            value={state.editor.selectedElement.styles.alignItems || ""}
          >
            <TabsList className={TABLIST_CLASS}>
              <TabsTrigger value="center" className={TABS_TRIGGER_CLASS}>
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger value="normal" className={TABS_TRIGGER_CLASS}>
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: "display",
                    value: va.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>
          <div>
            <Label className="text-muted-foreground"> Direction</Label>
            <Input
              placeholder="px"
              id="flexDirection"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.flexDirection || ""}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Gap</Label>
              <Input
                placeholder="px"
                id="gap"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.gap || ""}
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Wrap</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "flexWrap",
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.flexWrap || ""}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Nowrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="nowrap">No Wrap</SelectItem>
                    <SelectItem value="wrap">Wrap</SelectItem>
                    <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
