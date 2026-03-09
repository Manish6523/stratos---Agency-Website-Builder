import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const professionalPortfolio: {
  name: string;
  category: TemplateCategory;
  imageUrl: string;
  elements: EditorElement[];
} = {
  name: "Professional Portfolio",
  category: "Portfolio",
  imageUrl: "/preview-images/[portfolio]-professional.png",
  elements: [
    {
      id: v4(),
      name: "Main Page Wrapper",
      styles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        color: "#1a1a1a",
      },
      type: "container",
      content: [
        // --- Navigation Header (Original Intact) ---
        {
          id: v4(),
          name: "Header Navigation",
          type: "container",
          styles: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 80px",
            backgroundColor: "#ffffff",
            position: "sticky",
            top: "0",
            zIndex: "50",
            borderBottom: "1px solid #f0f0f0",
          },
          content: [
            {
              id: v4(),
              name: "Logo",
              type: "text",
              styles: {
                fontSize: "24px",
                fontWeight: "800",
                letterSpacing: "-0.05em",
                color: "#1a1a1a",
              },
              content: { innerText: "OW" },
            },
            {
              id: v4(),
              name: "Nav Links Container",
              type: "container",
              styles: {
                display: "flex",
                alignItems: "center",
                gap: "32px",
                width: "fit-content",
              },
              content: [
                {
                  id: v4(),
                  name: "Nav Link Work",
                  type: "link",
                  styles: {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#555",
                  },
                  content: { innerText: "Work", href: "#work" },
                },
                {
                  id: v4(),
                  name: "Nav Link About",
                  type: "link",
                  styles: {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#555",
                  },
                  content: { innerText: "About", href: "#about" },
                },
                {
                  id: v4(),
                  name: "Resume Button",
                  type: "button",
                  styles: {
                    backgroundColor: "transparent",
                    color: "#1a1a1a",
                    border: "1px solid #1a1a1a",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                  },
                  content: { innerText: "View Resume" },
                },
              ],
            },
          ],
        },

        // --- Hero Section (Original Intact) ---
        {
          id: v4(),
          name: "Split Hero Section",
          type: "2Col",
          styles: {
            display: "flex",
            minHeight: "85vh",
            backgroundColor: "#ffffff",
          },
          content: [
            {
              id: v4(),
              name: "Hero Text Column",
              type: "container",
              styles: {
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px",
                backgroundColor: "#ffffff",
              },
              content: [
                {
                  id: v4(),
                  name: "Role Subtitle",
                  type: "text",
                  styles: {
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#888",
                    marginBottom: "16px",
                  },
                  content: { innerText: "Product Designer" },
                },
                {
                  id: v4(),
                  name: "Main Headline",
                  type: "h1",
                  styles: {
                    fontSize: "80px",
                    fontWeight: "800",
                    lineHeight: "1",
                    letterSpacing: "-0.05em",
                    color: "#1a1a1a",
                    marginBottom: "32px",
                  },
                  content: { innerText: "Olivia Williams" },
                },
                {
                  id: v4(),
                  name: "Hero Bio Text",
                  type: "text",
                  styles: {
                    fontSize: "18px",
                    lineHeight: "1.7",
                    color: "#555",
                    maxWidth: "540px",
                    marginBottom: "48px",
                  },
                  content: {
                    innerText:
                      "Specializing in creating intuitive digital products.",
                  },
                },
                {
                  id: v4(),
                  name: "Hero CTA Button",
                  type: "button",
                  styles: {
                    backgroundColor: "#6366f1",
                    color: "white",
                    padding: "18px 36px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  },
                  content: { innerText: "Explore My Projects" },
                },
              ],
            },
            {
              id: v4(),
              name: "Hero Image Column",
              type: "container",
              styles: {
                flex: "1",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              },
              content: [
                {
                  id: v4(),
                  name: "Portrait Image",
                  type: "image",
                  styles: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    aspectRatio: "1/1",
                  },
                  content: {
                    src: "https://img.freepik.com/premium-psd/white-tshirt-mockup-tee-design-merch-showcase-template-unisex-streetwear-aesthetic-branding_883241-54325.jpg?semt=ais_rp_progressive&w=740&q=80",
                  },
                },
              ],
            },
          ],
        },

        // --- Work Showcase Section (RESPONSIVE CARDS) ---
        {
          id: v4(),
          name: "Work Showcase Section",
          type: "container",
          styles: { padding: "120px 80px", backgroundColor: "#f9fafb" },
          content: [
            {
              id: v4(),
              name: "Section Title",
              type: "h2",
              styles: {
                fontSize: "42px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "#1a1a1a",
                marginBottom: "64px",
              },
              content: { innerText: "Selected Works" },
            },
            {
              id: v4(),
              name: "Projects Grid",
              type: "container", // Changed from 3Col to allow wrapping
              styles: {
                display: "flex",
                flexWrap: "wrap", // Allows stacking
                gap: "32px",
              },
              content: [
                // Project 1
                {
                  id: v4(),
                  name: "Project Card 1",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px", // Card wraps below this width
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Project 1 Image",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                      },
                      content: {
                        src: "https://cdn.dribbble.com/userupload/24099632/file/original-bceb0e900f848b9fc353e803a80a03e3.gif",
                      },
                    },
                    {
                      id: v4(),
                      name: "Card Content",
                      type: "container",
                      styles: { padding: "24px" },
                      content: [
                        {
                          id: v4(),
                          name: "Category",
                          type: "text",
                          styles: {
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#6366f1",
                            marginBottom: "8px",
                          },
                          content: { innerText: "E-Commerce App" },
                        },
                        {
                          id: v4(),
                          name: "Title",
                          type: "h3",
                          styles: {
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "12px",
                          },
                          content: { innerText: "Nova Fashion Platform" },
                        },
                        {
                          id: v4(),
                          name: "Desc",
                          type: "text",
                          styles: {},
                          content: {
                            innerText:
                              "Nova Fashion Platform is a e-commerce app for fashion lovers to buy and sell their fashion products.",
                          },
                        },
                      ],
                    },
                  ],
                },
                // Project 2
                {
                  id: v4(),
                  name: "Project Card 2",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Project 2 Image",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                      },
                      content: {
                        src: "https://cdn.dribbble.com/userupload/15929152/file/original-8d271ccec99a917add8d8bf095f6aa07.png",
                      },
                    },
                    {
                      id: v4(),
                      name: "Card Content",
                      type: "container",
                      styles: { padding: "24px" },
                      content: [
                        {
                          id: v4(),
                          name: "Category",
                          type: "text",
                          styles: {
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#10b981",
                            marginBottom: "8px",
                          },
                          content: { innerText: "Data Analytics SaaS" },
                        },
                        {
                          id: v4(),
                          name: "Title",
                          type: "h3",
                          styles: {
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "12px",
                          },
                          content: { innerText: "Quantum Insights Dashboard" },
                        },
                        {
                          id: v4(),
                          name: "Desc",
                          type: "text",
                          styles: {},
                          content: {
                            innerText:
                              "Quantum Insights Dashboard is a data analytics SaaS platform for businesses to analyze and visualize their data.",
                          },
                        },
                      ],
                    },
                  ],
                },
                // Project 3
                {
                  id: v4(),
                  name: "Project Card 3",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Project 3 Image",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                      },
                      content: {
                        src: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800",
                      },
                    },
                    {
                      id: v4(),
                      name: "Card Content",
                      type: "container",
                      styles: { padding: "24px" },
                      content: [
                        {
                          id: v4(),
                          name: "Category",
                          type: "text",
                          styles: {
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#f59e0b",
                            marginBottom: "8px",
                          },
                          content: { innerText: "EdTech Platform" },
                        },
                        {
                          id: v4(),
                          name: "Title",
                          type: "h3",
                          styles: {
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "12px",
                          },
                          content: { innerText: "SkillSync Learning Portal" },
                        },
                        {
                          id: v4(),
                          name: "Desc",
                          type: "text",
                          styles: {},
                          content: {
                            innerText:
                              "SkillSync Learning Portal is a multi tenant learning platform for skill development. It is a SaaS platform for skill development.",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // --- Footer (Original Intact) ---
        {
          id: v4(),
          name: "Footer Contact Section",
          type: "container",
          styles: {
            padding: "100px 80px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          },
          content: [
            {
              id: v4(),
              name: "Footer Headline",
              type: "h2",
              styles: {
                fontSize: "36px",
                fontWeight: "800",
                color: "#1a1a1a",
                marginBottom: "24px",
                maxWidth: "600px",
              },
              content: {
                innerText: "Let's create something extraordinary together.",
              },
            },
            {
              id: v4(),
              name: "Contact Button",
              type: "button",
              styles: {
                backgroundColor: "#1a1a1a",
                color: "white",
                padding: "16px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
              },
              content: { innerText: "Say Hello: olivia.w@email.dev" },
            },
          ],
        },
      ],
    },
  ],
};
