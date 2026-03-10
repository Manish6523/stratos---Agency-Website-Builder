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
  AlignVerticalJustifyEnd,
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {};

export default function SettingsTab({}: Props) {
  const { state, dispatch } = useEditor();

  const TABS_TRIGGER_CLASS =
    "cursor-pointer w-8 h-8 p-0 data-[state=active]:bg-background data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground rounded-sm transition-all flex items-center justify-center";
  const ACCORDIAN_TIRGGER_CLASS =
    "no-underline! cursor-pointer text-sm font-medium";
  const TABLIST_CLASS =
    "flex items-center w-full bg-muted/50 rounded-md p-1 gap-1 h-fit";
  const LABEL_CLASS = "text-muted-foreground text-xs font-medium";

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

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Custom
        </AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <Label className={LABEL_CLASS}>Link Path</Label>
                <Input
                  className="h-8 text-xs"
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
                <Label className={LABEL_CLASS}>Video URL</Label>
                <Input
                  className="h-8 text-xs"
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
                <Label className={LABEL_CLASS}>Image Source</Label>
                <Input
                  className="h-8 text-xs"
                  id="src"
                  placeholder="https://images.unsplash.com/..."
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.src || ""}
                />
                <Label className={`${LABEL_CLASS} mt-2`}>Alt Text</Label>
                <Input
                  className="h-8 text-xs"
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
                <Label className={LABEL_CLASS}>Custom HTML/JS</Label>
                <textarea
                  id="customCode"
                  className="w-full bg-background border p-2 rounded-md h-32 text-xs font-mono"
                  placeholder="<div>Hello World</div>"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.customCode || ""}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "progressBar" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2 mt-4">
                <Label className={LABEL_CLASS}>Progress Value (%)</Label>
                <div className="flex items-center justify-end">
                  <small className="p-2">
                    {state.editor.selectedElement.content.progressValue || 50}%
                  </small>
                </div>
                <Slider
                  onValueChange={(e) => {
                    handleChangeCustomValues({
                      target: {
                        id: "progressValue",
                        value: e[0],
                      },
                    });
                  }}
                  value={[
                    state.editor.selectedElement.content.progressValue || 50,
                  ]}
                  max={100}
                  step={1}
                />

                <Label className={`${LABEL_CLASS} mt-4`}>
                  Completed Bar Color
                </Label>
                <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
                  <div
                    className="w-10 h-full shrink-0 border-r"
                    style={{
                      backgroundColor:
                        state.editor.selectedElement.content.progressColor ||
                        "#3b82f6",
                    }}
                  />
                  <Input
                    placeholder="#3b82f6 or blue-500"
                    className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                    id="progressColor"
                    onChange={handleChangeCustomValues}
                    value={
                      state.editor.selectedElement.content.progressColor ||
                      "bg-primary"
                    }
                  />
                </div>

                <Label className={`${LABEL_CLASS} mt-2`}>
                  Background Track Color
                </Label>
                <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
                  <div
                    className="w-10 h-full shrink-0 border-r"
                    style={{
                      backgroundColor:
                        state.editor.selectedElement.content
                          .progressBackground || "#e2e8f0",
                    }}
                  />
                  <Input
                    placeholder="#e2e8f0 or slate-200"
                    className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                    id="progressBackground"
                    onChange={handleChangeCustomValues}
                    value={
                      state.editor.selectedElement.content.progressBackground ||
                      "bg-secondary"
                    }
                  />
                </div>
              </div>
            )}
          {state.editor.selectedElement.type === "iconBlock" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2 mt-4">
                <Label className={LABEL_CLASS}>Icon ID/Name</Label>
                <Input
                  className="h-8 text-xs"
                  id="icon"
                  placeholder="Info, Shield, Star, etc."
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.icon || ""}
                />
                <Label className={`${LABEL_CLASS} mt-2`}>Stroke Width</Label>
                <Input
                  className="h-8 text-xs"
                  id="strokeWidth"
                  placeholder="2"
                  type="number"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.strokeWidth || ""}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "slider" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2 mt-4">
                <Label className={LABEL_CLASS}>
                  Image URLs (Comma separated)
                </Label>
                <textarea
                  className="w-full bg-background border p-2 rounded-md h-32 text-xs font-mono"
                  placeholder="https://image1.jpg, https://image2.jpg"
                  onChange={(e) => {
                    handleChangeCustomValues({
                      target: {
                        id: "sliderImages",
                        value: e.target.value
                          .split(",")
                          .map((url) => url.trim()),
                      },
                    });
                  }}
                  value={
                    state.editor.selectedElement.content.sliderImages?.join(
                      ", ",
                    ) || ""
                  }
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0  border-y">
        <AccordionTrigger className={ACCORDIAN_TIRGGER_CLASS}>
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Text Align</Label>
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
            <Label className={LABEL_CLASS}>Font Family</Label>
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
              <SelectTrigger className="h-8 text-xs w-full">
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
            <Label className={LABEL_CLASS}>Color</Label>
            <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
              <div
                className="w-10 h-full shrink-0 border-r"
                style={{
                  backgroundColor: state.editor.selectedElement.styles.color,
                }}
              />
              <Input
                className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                id="color"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.color || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Weight</Label>
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
                <SelectTrigger className="h-8 text-xs w-full">
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
              <Label className={LABEL_CLASS}>Size</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontSize || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Line Height</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px/em"
                id="lineHeight"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.lineHeight || ""}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>Letter Spacing</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px"
                id="letterSpacing"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.letterSpacing || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Transform</Label>
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
                <SelectTrigger className="h-8 text-xs w-full">
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
              <Label className={LABEL_CLASS}>Decoration</Label>
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
                <SelectTrigger className="h-8 text-xs w-full">
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Height</Label>
                    <Input
                      className="h-8 text-xs"
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.height || ""}
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Width</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        className="h-8 text-xs"
                        placeholder="px"
                        id="width"
                        onChange={handleOnChanges}
                        value={state.editor.selectedElement.styles.width || ""}
                      />
                      <Button
                        variant={
                          state.editor.selectedElement.styles.width ===
                          "fit-content"
                            ? "default"
                            : "outline"
                        }
                        className="h-8 w-8 px-0 shrink-0"
                        title="Fit Content"
                        onClick={() => {
                          handleOnChanges({
                            target: {
                              id: "width",
                              value:
                                state.editor.selectedElement.styles.width ===
                                "fit-content"
                                  ? "100%"
                                  : "fit-content",
                            },
                          });
                        }}
                      >
                        <AlignHorizontalSpaceAround size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Max W</Label>
                    <Input
                      className="h-8 text-xs"
                      id="maxWidth"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.maxWidth || ""}
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Min W</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="minWidth"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.minWidth || ""}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Max H</Label>
                    <Input
                      className="h-8 text-xs"
                      id="maxHeight"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.maxHeight || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Min H</Label>
                    <Input
                      className="h-8 text-xs"
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
              <Label className={`${LABEL_CLASS} mb-1 block`}>Margin (px)</Label>
              <div className="flex gap-2 flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Top</Label>
                    <Input
                      className="h-8 text-xs"
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginTop || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Bottom</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="marginBottom"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginBottom || ""
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Left</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.marginLeft || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Right</Label>
                    <Input
                      className="h-8 text-xs"
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
              <Label className={`${LABEL_CLASS} mb-1 block`}>
                Padding (px)
              </Label>
              <div className="flex gap-2 flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Top</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingTop || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Bottom</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingBottom || ""
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className={LABEL_CLASS}>Left</Label>
                    <Input
                      className="h-8 text-xs"
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={
                        state.editor.selectedElement.styles.paddingLeft || ""
                      }
                    />
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Right</Label>
                    <Input
                      className="h-8 text-xs"
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
        <AccordionContent className="flex flex-col gap-3">
          <div>
            <Label className={LABEL_CLASS}>Opacity</Label>
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
            <Label className={LABEL_CLASS}>Border Radius</Label>
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
            <Label className={LABEL_CLASS}>Background Color</Label>
            <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
              <div
                className="w-10 h-full shrink-0 border-r"
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={
                  state.editor.selectedElement.styles.backgroundColor || ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Background Image</Label>
            <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
              <div
                className="w-10 h-full shrink-0 border-r"
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={
                  state.editor.selectedElement.styles.backgroundImage || ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Image Position</Label>
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
            <Label className={`${LABEL_CLASS} mb-1 block`}>
              Border Width (px)
            </Label>
            <div className="flex gap-2 flex-col">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className={LABEL_CLASS}>All</Label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="px"
                    id="borderWidth"
                    onChange={handleOnChanges}
                    value={
                      state.editor.selectedElement.styles.borderWidth || ""
                    }
                  />
                </div>
                <div>
                  <Label className={LABEL_CLASS}>Top</Label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="px"
                    id="borderTopWidth"
                    onChange={handleOnChanges}
                    value={
                      state.editor.selectedElement.styles.borderTopWidth || ""
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className={LABEL_CLASS}>Bottom</Label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="px"
                    id="borderBottomWidth"
                    onChange={handleOnChanges}
                    value={
                      state.editor.selectedElement.styles.borderBottomWidth ||
                      ""
                    }
                  />
                </div>
                <div>
                  <Label className={LABEL_CLASS}>Left</Label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="px"
                    id="borderLeftWidth"
                    onChange={handleOnChanges}
                    value={
                      state.editor.selectedElement.styles.borderLeftWidth || ""
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className={LABEL_CLASS}>Right</Label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="px"
                    id="borderRightWidth"
                    onChange={handleOnChanges}
                    value={
                      state.editor.selectedElement.styles.borderRightWidth || ""
                    }
                  />
                </div>
              </div>
            </div>

            <Label className={`${LABEL_CLASS} mt-2`}>
              Border Style & Color
            </Label>
            <div className="grid grid-cols-2 gap-2">
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
                <SelectTrigger className="h-8 text-xs w-full">
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
            <div className="flex border rounded-md overflow-hidden bg-transparent h-8">
              <div
                className="w-10 h-full shrink-0 border-r"
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.borderColor,
                }}
              />
              <Input
                placeholder="#000000"
                className="h-full text-xs border-none! shadow-none! rounded-none! flex-1 focus-visible:ring-0 px-2"
                id="borderColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.borderColor || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Box Shadow</Label>
            <Input
              className="h-8 text-xs"
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
        <AccordionContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Position</Label>
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
              <SelectTrigger className="h-8 text-xs w-full">
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Top</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px/%"
                id="top"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.top || ""}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>Bottom</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px/%"
                id="bottom"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.bottom || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Left</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px/%"
                id="left"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.left || ""}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>Right</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px/%"
                id="right"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.right || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={LABEL_CLASS}>Z-Index</Label>
            <Input
              className="h-8 text-xs"
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
          <Label className={LABEL_CLASS}>Justify Content</Label>
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
          <Label className={`${LABEL_CLASS} mt-2`}>Align Items</Label>
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
              <TabsTrigger value="end" className={TABS_TRIGGER_CLASS}>
                <AlignVerticalJustifyEnd size={18} />
              </TabsTrigger>
              <TabsTrigger value="center" className={TABS_TRIGGER_CLASS}>
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger value="start" className={TABS_TRIGGER_CLASS}>
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4 shrink-0"
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
            <Label className={LABEL_CLASS}>Flex</Label>
          </div>
          <div>
            <Label className={LABEL_CLASS}> Direction</Label>
            <Select
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "flexDirection",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.flexDirection || ""}
            >
              <SelectTrigger className="h-8 text-xs w-full">
                <SelectValue placeholder="Row" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={LABEL_CLASS}>Gap</Label>
              <Input
                className="h-8 text-xs"
                placeholder="px"
                id="gap"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.gap || ""}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>Wrap</Label>
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
                <SelectTrigger className="h-8 text-xs w-full">
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
