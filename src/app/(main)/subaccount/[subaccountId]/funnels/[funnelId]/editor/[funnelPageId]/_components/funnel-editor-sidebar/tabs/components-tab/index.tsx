import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import React from "react";

// Placeholder Imports
import TextPlaceholder from "./TextPlaceholder";
import ContainerPlaceholder from "./ContainerPlaceholder";
import VideoPlaceholder from "./VideoPlaceholder";
import TwoColumnsPlaceholder from "./TwoColumnsPlaceholder";
import GridPlaceholder from "./GridPlaceholder";
import LinkPlaceholder from "./LinkPlaceholder";
import ContactFormComponentPlaceholder from "./ContactFormComponentPlaceholder";
import CustomFormPlaceholder from "./CustomFormPlaceholder";
import CheckoutPlaceholder from "./CheckoutPlaceholder";
import DividerPlaceholder from "./DividerPlaceholder";
import ButtonPlaceholder from "./ButtonPlaceholder";
import CustomEmbedPlaceholder from "./CustomEmbedPlaceholder";
import ImagePlaceholder from "./ImagePlaceholder";
import H1Placeholder from "./H1Placeholder";
import H2Placeholder from "./H2Placeholder";
import H3Placeholder from "./H3Placeholder";
import ThreeColumnsPlaceholder from "./ThreeColumnsPlaceholder";
import TestimonialPlaceholder from "./TestimonialPlaceholder";
import ProgressBarPlaceholder from "./ProgressBarPlaceholder";
import SliderPlaceholder from "./SliderPlaceholder";
import IconBlockPlaceholder from "./IconBlockPlaceholder";

type Props = {};

export default function ComponentsTab({}: Props) {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      Component: <ThreeColumnsPlaceholder />,
      label: "3 Columns",
      id: "3Col",
      group: "layout",
    },
    {
      Component: <GridPlaceholder />,
      label: "Grid",
      id: "grid",
      group: "layout",
    },
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      Component: <VideoPlaceholder />,
      label: "Video",
      id: "video",
      group: "elements",
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: "Contact",
      id: "contactForm",
      group: "elements",
    },
    {
      Component: <CustomFormPlaceholder />,
      label: "My Forms",
      id: "customForm",
      group: "elements",
    },
    // {
    //   Component: <CheckoutPlaceholder />,
    //   label: "Checkout",
    //   id: "paymentForm",
    //   group: "elements",
    // },
    {
      Component: <LinkPlaceholder />,
      label: "Link",
      id: "link",
      group: "elements",
    },
    {
      Component: <DividerPlaceholder />,
      label: "Divider",
      id: "divider",
      group: "elements",
    },
    {
      Component: <ButtonPlaceholder />,
      label: "Button",
      id: "button",
      group: "elements",
    },
    {
      Component: <CustomEmbedPlaceholder />,
      label: "Embed",
      id: "customEmbed",
      group: "elements",
    },
    { Component: <H1Placeholder />, label: "H1", id: "h1", group: "elements" },
    { Component: <H2Placeholder />, label: "H2", id: "h2", group: "elements" },
    { Component: <H3Placeholder />, label: "H3", id: "h3", group: "elements" },
    {
      Component: <ImagePlaceholder />,
      label: "Image",
      id: "image",
      group: "elements",
    },
    {
      Component: <TestimonialPlaceholder />,
      label: "Reviews",
      id: "testimonial",
      group: "elements",
    },
    {
      Component: <ProgressBarPlaceholder />,
      label: "Progress",
      id: "progressBar",
      group: "elements",
    },
    {
      Component: <SliderPlaceholder />,
      label: "Slider",
      id: "slider",
      group: "elements",
    },
    {
      Component: <IconBlockPlaceholder />,
      label: "Icon Block",
      id: "iconBlock",
      group: "elements",
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full border-none"
      defaultValue={["Layout", "Elements"]}
    >
      {/* LAYOUT SECTION */}
      <AccordionItem value="Layout" className="border-b border-border/50">
        <AccordionTrigger className="px-3 py-2 hover:no-underline font-semibold text-[10px] uppercase tracking-widest text-muted-foreground/80">
          Layout Structure
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3 mt-1">
          <div className="grid grid-cols-3 gap-2">
            {elements
              .filter((el) => el.group === "layout")
              .map((element) => (
                <div
                  key={element.id}
                  className="group flex flex-col cursor-grab items-center justify-center gap-2"
                >
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity scale-90">
                    {element.Component}
                  </div>
                  <span className="text-[9px] font-medium text-muted-foreground group-hover:text-foreground text-center truncate w-full">
                    {element.label}
                  </span>
                </div>
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ELEMENTS SECTION */}
      <AccordionItem value="Elements" className="border-none">
        <AccordionTrigger className="px-3 py-2 hover:no-underline font-semibold text-[10px] uppercase tracking-widest text-muted-foreground/80">
          Basic Elements
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3 mt-1">
          <div className="grid grid-cols-4 gap-y-3 gap-x-2">
            {elements
              .filter((el) => el.group === "elements")
              .map((element) => (
                <div
                  key={element.id}
                  className="group flex flex-col cursor-grab items-center justify-center gap-2"
                >
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity scale-90">
                    {element.Component}
                  </div>
                  <span className="text-[9px] font-medium text-muted-foreground group-hover:text-foreground text-center truncate w-full">
                    {element.label}
                  </span>
                </div>
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
