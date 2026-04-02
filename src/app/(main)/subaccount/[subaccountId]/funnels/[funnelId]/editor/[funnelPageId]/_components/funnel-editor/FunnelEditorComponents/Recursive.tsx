import { EditorElement } from "@/providers/editor/editor-provider";
import React from "react";
import TextComponent from "./TextComponent";
import Container from "./Container";
import VideoComponent from "./VideoComponent";
import LinkComponent from "./LinkComponent";
import ContactFormComponent from "./ContactFormComponent";
import CustomFormComponent from "./CustomFormComponent";
import Checkout from "./Checkout";
import DividerComponent from "./DividerComponent";
import ButtonComponent from "./ButtonComponent";
import CustomEmbedComponent from "./CustomEmbedComponent";
import ImageComponent from "./ImageComponent";
import HeadingComponent from "./HeadingComponent";
import TestimonialComponent from "./TestimonialComponent";
import ProgressBarComponent from "./ProgressBarComponent";
import SliderComponent from "./SliderComponent";
import IconBlockComponent from "./IconBlockComponent";
import GridContainer from "./GridContainer";

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "contactForm":
      return <ContactFormComponent element={element} />;
    case "customForm":
      return <CustomFormComponent element={element} />;
    case "paymentForm":
      return <Checkout element={element} />;
    case "2Col":
    case "3Col":
      return <Container element={element} />;
    case "grid":
      return <GridContainer element={element} />;
    case "__body":
      return <Container element={element} />;

    case "link":
      return <LinkComponent element={element} />;
    case "divider":
      return <DividerComponent element={element} />;
    case "button":
      return <ButtonComponent element={element} />;
    case "customEmbed":
      return <CustomEmbedComponent element={element} />;
    case "image":
      return <ImageComponent element={element} />;
    case "h1":
    case "h2":
    case "h3":
      return <HeadingComponent element={element} />;
    case "testimonial":
      return <TestimonialComponent element={element} />;
    case "progressBar":
      return <ProgressBarComponent element={element} />;
    case "slider":
      return <SliderComponent element={element} />;
    case "iconBlock":
      return <IconBlockComponent element={element} />;
    default:
      return null;
  }
};

export default Recursive;
