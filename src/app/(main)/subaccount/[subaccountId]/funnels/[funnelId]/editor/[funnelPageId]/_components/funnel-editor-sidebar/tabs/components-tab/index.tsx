import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import React from "react";
import TextPlaceholder from "./TextPlaceholder";
import ContainerPlaceholder from "./ContainerPlaceholder";
import VideoPlaceholder from "./VideoPlaceholder";
import TwoColumnsPlaceholder from "./TwoColumnsPlaceholder";
import LinkPlaceholder from "./LinkPlaceholder";
import ContactFormComponentPlaceholder from "./ContactFormComponentPlaceholder";
import CheckoutPlaceholder from "./CheckoutPlaceholder";
import DividerPlaceholder from "./DividerPlaceholder";
import ButtonPlaceholder from "./ButtonPlaceholder";
import CustomEmbedPlaceholder from "./CustomEmbedPlaceholder";
import ImagePlaceholder from "./ImagePlaceholder";
import H1Placeholder from "./H1Placeholder";
import H2Placeholder from "./H2Placeholder";
import H3Placeholder from "./H3Placeholder";
import ThreeColumnsPlaceholder from "./ThreeColumnsPlaceholder";

type Props = {};

export default function ComponentsTab({}: Props) {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
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
      Component: <CheckoutPlaceholder />,
      label: "Checkout",
      id: "paymentForm",
      group: "elements",
    },
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
    {
      Component: <H1Placeholder />,
      label: "Heading 1",
      id: "h1",
      group: "elements",
    },
    {
      Component: <H2Placeholder />,
      label: "Heading 2",
      id: "h2",
      group: "elements",
    },
    {
      Component: <H3Placeholder />,
      label: "Heading 3",
      id: "h3",
      group: "elements",
    },
    {
      Component: <ImagePlaceholder />,
      label: "Image",
      id: "image",
      group: "elements",
    },
    {
      Component: <ThreeColumnsPlaceholder />,
      label: "3 Columns",
      id: "3Col",
      group: "layout",
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-6 py-0 border-y">
        <AccordionTrigger className="no-underline!">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0 ">
        <AccordionTrigger className="no-underline!">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
