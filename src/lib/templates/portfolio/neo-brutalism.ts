import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const neoBrutalismPortfolio: {
  name: string;
  imageUrl?: string;
  category: TemplateCategory;
  elements: EditorElement[];
} = {
  name: "Neo-Brutalism Portfolio",
  imageUrl: "/preview-images/[portfolio]-neo-brutalism.png",
  category: "Portfolio",
  elements: [
    {
      id: v4(),
      name: "Main Wrapper",
      type: "container",
      styles: {
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f9f6f0",
        overflowX: "hidden",
      },
      content: [
        /* --- HERO SECTION --- */
        {
          id: v4(),
          name: "Hero Section Container",
          type: "container",
          styles: {
            position: "relative",
            paddingBottom: "0px",
          },
          content: [
            {
              id: v4(),
              name: "Yellow Accent Strip",
              type: "container",
              styles: {
                position: "absolute",
                width: "350px",
                height: "1500px",
                backgroundColor: "#fed136",
                transform: "rotate(45deg)",
                right: "5%",
                top: "-20%",
                zIndex: "0",
              },
              content: [],
            },
            {
              id: v4(),
              name: "Navbar Wrapper",
              type: "container",
              styles: {
                position: "relative",
                zIndex: "10",
                maxWidth: "1100px",
                margin: "40px auto 0",
                padding: "0 20px",
              },
              content: [
                {
                  id: v4(),
                  name: "Navbar",
                  type: "container",
                  styles: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    border: "4px solid #101010",
                    borderRadius: "100px",
                    padding: "8px 12px",
                    boxShadow: "0px 8px 0px 0px #101010",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Logo Container",
                      type: "container",
                      styles: {
                        backgroundColor: "#101010",
                        borderRadius: "50px",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      content: [
                        {
                          id: v4(),
                          name: "Logo Text",
                          type: "text",
                          styles: {
                            color: "#fed136",
                            fontWeight: "900",
                            fontSize: "24px",
                          },
                          content: { innerText: "li" },
                        },
                      ],
                    },
                    {
                      id: v4(),
                      name: "Nav Links",
                      type: "container",
                      styles: {
                        display: "flex",
                        gap: "40px",
                        alignItems: "center",
                      },
                      content: ["Home", "About", "Portfolio", "Pricing"].map(
                        (link) => ({
                          id: v4(),
                          name: link,
                          type: "text",
                          styles: {
                            fontWeight: "800",
                            fontSize: "15px",
                            color: "#101010",
                          },
                          content: { innerText: link },
                        }),
                      ),
                    },
                    {
                      id: v4(),
                      name: "Contact Button",
                      type: "button",
                      styles: {
                        backgroundColor: "#101010",
                        color: "#ffffff",
                        borderRadius: "50px",
                        padding: "16px 36px",
                        fontWeight: "700",
                        fontSize: "15px",
                        border: "none",
                      },
                      content: { innerText: "Contact" },
                    },
                  ],
                },
              ],
            },
            {
              id: v4(),
              name: "Hero Content",
              type: "container",
              styles: {
                position: "relative",
                zIndex: "5",
                maxWidth: "1100px",
                margin: "80px auto 0",
                padding: "0 20px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              },
              content: [
                {
                  id: v4(),
                  name: "Left Column",
                  type: "container",
                  styles: {
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Headline 1",
                      type: "h1",
                      styles: {
                        fontSize: "72px",
                        fontWeight: "800",
                        color: "#101010",
                        lineHeight: "1.1",
                        margin: "0",
                      },
                      content: { innerText: "Hello, I'm" },
                    },
                    {
                      id: v4(),
                      name: "Headline Highlight",
                      type: "container",
                      styles: {
                        backgroundColor: "#14737d",
                        borderRadius: "16px",
                        padding: "8px 24px",
                        margin: "10px 0 30px 0",
                      },
                      content: [
                        {
                          id: v4(),
                          name: "Headline 2",
                          type: "h1",
                          styles: {
                            fontSize: "72px",
                            fontWeight: "800",
                            color: "#ffffff",
                            margin: "0",
                          },
                          content: { innerText: "Wilson Koss" },
                        },
                      ],
                    },
                    {
                      id: v4(),
                      name: "Description",
                      type: "text",
                      styles: {
                        fontSize: "18px",
                        lineHeight: "1.6",
                        color: "#333",
                        maxWidth: "480px",
                        marginBottom: "40px",
                      },
                      content: {
                        innerText:
                          "A multidisciplinary designer based in New York, specializing in high-end brand identities and digital experiences.",
                      },
                    },
                    {
                      id: v4(),
                      name: "Buttons",
                      type: "container",
                      styles: { display: "flex", gap: "24px" },
                      content: [
                        {
                          id: v4(),
                          name: "Primary",
                          type: "button",
                          styles: {
                            backgroundColor: "#101010",
                            color: "#fff",
                            padding: "18px 40px",
                            borderRadius: "12px",
                            fontWeight: "700",
                            border: "none",
                          },
                          content: { innerText: "Get in touch" },
                        },
                        {
                          id: v4(),
                          name: "Secondary",
                          type: "button",
                          styles: {
                            backgroundColor: "#fff",
                            color: "#101010",
                            border: "3px solid #101010",
                            padding: "18px 40px",
                            borderRadius: "12px",
                            fontWeight: "700",
                          },
                          content: { innerText: "My story" },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: v4(),
                  name: "Right Column",
                  type: "container",
                  styles: {
                    flex: "1",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  },
                  content: [
                    {
                      
                          id: v4(),
                          name: "Img",
                          type: "image",
                          styles: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border:"6px solid #101010",
                            aspectRatio: "1 / 1",
                            objectPosition: "center",
                          },
                          content: {
                            src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800",
                          },
                        },
                  ],
                },
              ],
            },
          ],
        },

        /* --- BRANDS BAR --- */
        {
          id: v4(),
          name: "Slanted Brands Bar",
          type: "container",
          styles: {
            backgroundColor: "#101010",
            padding: "60px 0",
            transform: "rotate(-2deg) scale(1.1)",
            margin: "40px 0",
            display: "flex",
            justifyContent: "center",
            gap: "80px",
          },
          content: [
            "Google",
            "YouTube",
            "Dribbble",
            "Webflow",
            "Pinterest",
          ].map((brand) => ({
            id: v4(),
            name: brand,
            type: "text",
            styles: {
              color: "#fff",
              fontSize: "28px",
              fontWeight: "800",
              opacity: "0.8",
            },
            content: { innerText: brand },
          })),
        },

        /* --- SERVICES SECTION --- */
        {
          id: v4(),
          name: "Services Section",
          type: "container",
          styles: {
            maxWidth: "1100px",
            margin: "120px auto",
            padding: "0 20px",
          },
          content: [
            {
              id: v4(),
              name: "Services Title",
              type: "h2",
              styles: {
                color: "#101010",
                fontSize: "48px",
                fontWeight: "900",
                marginBottom: "60px",
              },
              content: { innerText: "My Expertise" },
            },
            {
              id: v4(),
              name: "Services Grid",
              type: "3Col",
              styles: { display: "flex", gap: "30px" },
              content: [
                {
                  id: v4(),
                  name: "Col 1",
                  type: "container",
                  styles: {
                    backgroundColor: "#fff",
                    border: "4px solid #101010",
                    padding: "40px",
                    borderRadius: "24px",
                    boxShadow: "10px 10px 0px 0px #14737d",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Icon",
                      type: "iconBlock",
                      styles: { color: "#14737d", marginBottom: "20px" },
                      content: { icon: "figma", innerText: "" },
                    },
                    {
                      id: v4(),
                      name: "Title",
                      type: "h3",
                      styles: {
                        color: "#14737d",
                        fontSize: "24px",
                        fontWeight: "800",
                      },
                      content: { innerText: "UI/UX Design" },
                    },
                    {
                      id: v4(),
                      name: "Txt",
                      type: "text",
                      styles: { marginTop: "15px", color: "#555" },
                      content: {
                        innerText:
                          "Modern, clean interfaces designed with a user-first.",
                      },
                    },
                  ],
                },
                {
                  id: v4(),
                  name: "Col 2",
                  type: "container",
                  styles: {
                    backgroundColor: "#fff",
                    border: "4px solid #101010",
                    padding: "40px",
                    borderRadius: "24px",
                    boxShadow: "10px 10px 0px 0px #fed136",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Icon",
                      type: "iconBlock",
                      styles: { color: "#fed136", marginBottom: "20px" },
                      content: { icon: "code", innerText: "" },
                    },
                    {
                      id: v4(),
                      name: "Title",
                      type: "h3",
                      styles: {
                        color: "#fed136",
                        fontSize: "24px",
                        fontWeight: "800",
                      },
                      content: { innerText: "Development" },
                    },
                    {
                      id: v4(),
                      name: "Txt",
                      type: "text",
                      styles: { marginTop: "15px", color: "#555" },
                      content: {
                        innerText:
                          "Fast, responsive websites built with the latest technologies.",
                      },
                    },
                  ],
                },
                {
                  id: v4(),
                  name: "Col 3",
                  type: "container",
                  styles: {
                    backgroundColor: "#fff",
                    border: "4px solid #101010",
                    padding: "40px",
                    borderRadius: "24px",
                    boxShadow: "10px 10px 0px 0px #101010",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "Icon",
                      type: "iconBlock",
                      styles: { color: "#101010", marginBottom: "20px" },
                      content: { icon: "zap", innerText: "" },
                    },
                    {
                      id: v4(),
                      name: "Title",
                      type: "h3",
                      styles: {
                        color: "#101010",
                        fontSize: "24px",
                        fontWeight: "800",
                      },
                      content: { innerText: "Branding" },
                    },
                    {
                      id: v4(),
                      name: "Txt",
                      type: "text",
                      styles: { marginTop: "15px", color: "#555" },
                      content: {
                        innerText:
                          "Unique visual identities that make your brand stand out.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        /* --- PORTFOLIO GRID --- */
        {
          id: v4(),
          name: "Portfolio Grid",
          type: "container",
          styles: {
            maxWidth: "1100px",
            margin: "120px auto",
            padding: "0 20px",
          },
          content: [
            {
              id: v4(),
              name: "Title Container",
              type: "container",
              styles: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "30px",
              },
              content: [
                {
                  id: v4(),
                  name: "H2",
                  type: "h2",
                  styles: {
                    color: "#101010",
                    fontSize: "48px",
                    fontWeight: "900",
                  },
                  content: { innerText: "Recent Work" },
                },
                {
                  id: v4(),
                  name: "Link",
                  type: "link",
                  styles: {
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#14737d",
                    textDecoration: "underline",
                  },
                  content: { innerText: "See all projects", href: "/work" },
                },
              ],
            },
            {
              content: [],
              id: v4(),
              name: "Divider",
              styles: {
                backgroundColor: "yellow",
                height: "3px",
                borderTop: "1px solid #101010",
              },
              type: "divider",
            },
            {
              id: v4(),
              name: "Grid",
              type: "2Col",
              styles: { display: "flex", gap: "40px" },
              content: [
                {
                  id: v4(),
                  name: "Proj 1",
                  type: "container",
                  styles: { flex: "1" },
                  content: [
                    {
                      id: v4(),
                      name: "Img",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        borderRadius: "32px",
                        border: "4px solid #101010",
                      },
                      content: {
                        src: "https://cdn.dribbble.com/userupload/7065333/file/original-e93d3e52c4e2798d1f6375a3b0cf35f6.png?resize=1024x768&vertical=center",
                      },
                    },
                    {
                      id: v4(),
                      name: "T",
                      type: "text",
                      styles: {
                        fontSize: "24px",
                        fontWeight: "800",
                        marginTop: "20px",
                        color: "#101010",
                      },
                      content: { innerText: "Mobile Banking UI" },
                    },
                  ],
                },
                {
                  id: v4(),
                  name: "Proj 2",
                  type: "container",
                  styles: { flex: "1" },
                  content: [
                    {
                      id: v4(),
                      name: "Img",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        borderRadius: "32px",
                        border: "4px solid #101010",
                      },
                      content: {
                        src: "https://cdn.dribbble.com/userupload/24548166/file/original-ece0a6cadcf2140f4973018508b087d3.jpg?resize=1024x768&vertical=center",
                      },
                    },
                    {
                      id: v4(),
                      name: "T",
                      type: "text",
                      styles: {
                        color: "#101010",
                        fontSize: "24px",
                        fontWeight: "800",
                        marginTop: "20px",
                      },
                      content: { innerText: "E-Commerce Rebrand" },
                    },
                  ],
                },
              ],
            },
          ],
        },

        /* --- CONTACT CTA --- */
        {
          id: v4(),
          name: "CTA Footer",
          type: "container",
          styles: {
            backgroundColor: "#fed136",
            padding: "100px 20px",
            textAlign: "center",
            display: "flex",
            // center 
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderTop: "4px solid #101010",
          },
          content: [
            {
              id: v4(),
              name: "H2",
              type: "h2",
              styles: {
                fontSize: "64px",
                fontWeight: "900",
                marginBottom: "20px",
              },
              content: { innerText: "Let's create something." },
            },
            {
              id: v4(),
              name: "Btn",
              type: "button",
              styles: {
                backgroundColor: "#101010",
                color: "#fff",
                padding: "20px 60px",
                borderRadius: "100px",
                fontSize: "20px",
                fontWeight: "800",
                border: "none",
                marginTop: "30px",
              },
              content: { innerText: "Get Started Now" },
            },
          ],
        },
      ],
    },
  ],
};
