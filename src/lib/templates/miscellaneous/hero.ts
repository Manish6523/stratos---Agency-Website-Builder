import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const bestHeroSection: {
  name: string;
  category: TemplateCategory;
  elements: EditorElement[];
} = {
  name: "Best Hero Section",
  category: "Miscellaneous",
  elements: [
    {
      id: v4(),
      name: "Hero Section",
      styles: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "100px 10%",
        backgroundColor: "#f9fafb",
        gap: "40px",
        minHeight: "600px",
      },
      type: "2Col",
      content: [
        {
          id: v4(),
          name: "Hero Text Left",
          styles: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "20px",
          },
          type: "container",
          content: [
            {
              id: v4(),
              name: "Headline",
              styles: {
                fontSize: "56px",
                fontWeight: "900",
                lineHeight: "1.1",
                color: "#111827",
              },
              type: "text",
              content: { innerText: "Scale Your Agency to the Moon" },
            },
            {
              id: v4(),
              name: "Subheadline",
              styles: { fontSize: "20px", color: "#4b5563" },
              type: "text",
              content: {
                innerText:
                  "The only platform you will ever need to manage clients, build funnels, and collect payments.",
              },
            },
            {
              id: v4(),
              name: "CTA Button",
              styles: {
                padding: "16px 32px",
                fontSize: "18px",
                backgroundColor: "#1d4ed8",
                color: "white",
                borderRadius: "12px",
                width: "fit-content",
              },
              type: "button",
              content: { innerText: "Start for Free" },
            },
          ],
        },
        {
          id: v4(),
          name: "Hero Image Right",
          styles: {
            flex: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          type: "container",
          content: [
            {
              id: v4(),
              name: "Image Placeholder",
              styles: {
                width: "100%",
                height: "400px",
                backgroundColor: "#e5e7eb",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              type: "container",
              content: [
                {
                  id: v4(),
                  name: "Note",
                  styles: { color: "#9ca3af", fontWeight: "medium" },
                  type: "text",
                  content: { innerText: "App Screenshot Goes Here" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
