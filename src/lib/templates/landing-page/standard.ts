import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const standardLandingPage: {
  name: string;
  category: TemplateCategory;
  elements: EditorElement[];
} = {
  name: "Standard Landing Page",
  category: "Landing Page",
  elements: [
    {
      id: v4(),
      name: "Nav",
      styles: {
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      type: "2Col",
      content: [
        {
          id: v4(),
          name: "Logo",
          styles: { fontWeight: "bold", fontSize: "20px" },
          type: "text",
          content: { innerText: "SaaSCompany" },
        },
        {
          id: v4(),
          name: "Button",
          styles: {
            padding: "8px 16px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "6px",
          },
          type: "button",
          content: { innerText: "Get Started" },
        },
      ],
    },
    {
      id: v4(),
      name: "Hero Center",
      styles: {
        padding: "100px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      },
      type: "container",
      content: [
        {
          id: v4(),
          name: "Badge",
          styles: {
            padding: "4px 12px",
            backgroundColor: "#f3f4f6",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            width: "fit-content",
          },
          type: "text",
          content: { innerText: "✨ New Feature Released" },
        },
        {
          id: v4(),
          name: "Title",
          styles: { fontSize: "48px", fontWeight: "bold", maxWidth: "800px" },
          type: "text",
          content: { innerText: "Build faster with our tools" },
        },
        {
          id: v4(),
          name: "Subtitle",
          styles: { fontSize: "18px", color: "#6b7280", maxWidth: "600px" },
          type: "text",
          content: {
            innerText:
              "Everything you need to run your business online, in one place.",
          },
        },
        {
          id: v4(),
          name: "CTA",
          styles: {
            marginTop: "10px",
            padding: "14px 28px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
          },
          type: "button",
          content: { innerText: "Start your free trial" },
        },
      ],
    },
    {
      id: v4(),
      name: "Features",
      styles: { padding: "80px 20px", backgroundColor: "#f9fafb" },
      type: "container",
      content: [
        {
          id: v4(),
          name: "Section Title",
          styles: {
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          },
          type: "text",
          content: { innerText: "Features" },
        },
        {
          id: v4(),
          name: "Grid",
          styles: {
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: "1000px",
            margin: "0 auto",
          },
          type: "3Col",
          content: [
            {
              id: v4(),
              name: "Feature 1",
              styles: {
                flex: 1,
                minWidth: "250px",
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              },
              type: "container",
              content: [
                {
                  id: v4(),
                  name: "Icon",
                  styles: { fontSize: "24px", marginBottom: "10px" },
                  type: "text",
                  content: { innerText: "⚡" },
                },
                {
                  id: v4(),
                  name: "Title",
                  styles: { fontWeight: "bold", fontSize: "18px" },
                  type: "text",
                  content: { innerText: "Lightning Fast" },
                },
                {
                  id: v4(),
                  name: "Desc",
                  styles: {
                    color: "#6b7280",
                    marginTop: "5px",
                    fontSize: "14px",
                  },
                  type: "text",
                  content: {
                    innerText: "Optimized for speed and conversion.",
                  },
                },
              ],
            },
            {
              id: v4(),
              name: "Feature 2",
              styles: {
                flex: 1,
                minWidth: "250px",
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              },
              type: "container",
              content: [
                {
                  id: v4(),
                  name: "Icon",
                  styles: { fontSize: "24px", marginBottom: "10px" },
                  type: "text",
                  content: { innerText: "🔒" },
                },
                {
                  id: v4(),
                  name: "Title",
                  styles: { fontWeight: "bold", fontSize: "18px" },
                  type: "text",
                  content: { innerText: "Secure" },
                },
                {
                  id: v4(),
                  name: "Desc",
                  styles: {
                    color: "#6b7280",
                    marginTop: "5px",
                    fontSize: "14px",
                  },
                  type: "text",
                  content: {
                    innerText: "Enterprise-grade security included.",
                  },
                },
              ],
            },
            {
              id: v4(),
              name: "Feature 3",
              styles: {
                flex: 1,
                minWidth: "250px",
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              },
              type: "container",
              content: [
                {
                  id: v4(),
                  name: "Icon",
                  styles: { fontSize: "24px", marginBottom: "10px" },
                  type: "text",
                  content: { innerText: "📈" },
                },
                {
                  id: v4(),
                  name: "Title",
                  styles: { fontWeight: "bold", fontSize: "18px" },
                  type: "text",
                  content: { innerText: "Scalable" },
                },
                {
                  id: v4(),
                  name: "Desc",
                  styles: {
                    color: "#6b7280",
                    marginTop: "5px",
                    fontSize: "14px",
                  },
                  type: "text",
                  content: { innerText: "Grows with your business." },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
