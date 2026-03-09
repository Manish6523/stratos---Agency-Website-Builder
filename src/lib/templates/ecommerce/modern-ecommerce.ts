import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const modernCommerce: {
  name: string;
  category: TemplateCategory;
  elements: EditorElement[];
  imageUrl?: string;
} = {
  name: "Modern E-Commerce",
  category: "E-commerce",
  imageUrl:
    "/preview-images/[ecommerce]-modern.png",
  elements: [
    {
      id: v4(),
      name: "Store Wrapper",
      styles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#ffffff",
        fontFamily: "'Inter', sans-serif",
      },
      type: "container",
      content: [
        // --- 1. PROMO BAR (Dark) ---
        {
          id: v4(),
          name: "Promo Bar",
          type: "text",
          styles: {
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "12px",
            fontSize: "12px",
            textAlign: "center",
            fontWeight: "600",
            letterSpacing: "0.1em",
            width: "100%",
          },
          content: { innerText: "NEW SEASON: UP TO 40% OFF SELECT ITEMS" },
        },

        // --- 2. NAVIGATION (Sticky) ---
        {
          id: v4(),
          name: "Navbar",
          type: "container",
          styles: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 80px",
            borderBottom: "1px solid #f0f0f0",
            backgroundColor: "#ffffff",
            position: "sticky",
            top: "0",
            zIndex: "10",
          },
          content: [
            {
              id: v4(),
              name: "Logo",
              type: "text",
              styles: {
                fontSize: "24px",
                fontWeight: "900",
                color: "#000000",
                letterSpacing: "-1px",
              },
              content: { innerText: "LMNR." },
            },
            {
              id: v4(),
              name: "Nav Links",
              type: "container",
              styles: { display: "flex", gap: "40px", width: "fit-content" },
              content: [
                {
                  id: v4(),
                  name: "Link 1",
                  type: "link",
                  styles: {
                    fontSize: "14px",
                    color: "#1a1a1a",
                    fontWeight: "500",
                  },
                  content: { innerText: "SHOP ALL", href: "#" },
                },
                {
                  id: v4(),
                  name: "Link 2",
                  type: "link",
                  styles: {
                    fontSize: "14px",
                    color: "#1a1a1a",
                    fontWeight: "500",
                  },
                  content: { innerText: "COLLECTIONS", href: "#" },
                },
                {
                  id: v4(),
                  name: "Link 3",
                  type: "link",
                  styles: {
                    fontSize: "14px",
                    color: "#1a1a1a",
                    fontWeight: "500",
                  },
                  content: { innerText: "OUR STORY", href: "#" },
                },
              ],
            },
            {
              id: v4(),
              name: "Cart Button Group",
              type: "container",
              styles: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "50px", // Pill shape for a modern feel
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                transition: "all 0.2s ease",
                width: "fit-content",
              },
              content: [
                {
                  id: v4(),
                  name: "Cart Icon Component",
                  type: "iconBlock", // Assuming your editor supports an 'icon' type
                  styles: {
                    width: "20px",
                    height: "20px",
                    color: "#1a1a1a",
                  },
                  content: {
                    icon: "ShoppingBag", // Lucide Icon Name
                  },
                },
                {
                  id: v4(),
                  name: "Cart Count Badge",
                  type: "text",
                  styles: {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    marginLeft: "4px",
                    width: "fit-content",
                  },
                  content: { innerText: "0" },
                },
              ],
            },
          ],
        },

        // --- 3. HERO SECTION (Split) ---
        {
          id: v4(),
          name: "Hero Section",
          type: "container",
          styles: {
            display: "flex",
            // flexWrap: "wrap",
            minHeight: "700px",
            backgroundColor: "#f9f9f9",
          },
          content: [
            {
              id: v4(),
              name: "Hero Text Side",
              type: "container",
              styles: {
                flex: "1",
                minWidth: "60%",
                padding: "100px 80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
              content: [
                {
                  id: v4(),
                  name: "H-Label",
                  type: "text",
                  styles: {
                    color: "#6366f1",
                    fontWeight: "700",
                    fontSize: "14px",
                    marginBottom: "20px",
                  },
                  content: { innerText: "ESTABLISHED 2026" },
                },
                {
                  id: v4(),
                  name: "H-Title",
                  type: "h1",
                  styles: {
                    fontSize: "72px",
                    fontWeight: "900",
                    lineHeight: "1",
                    color: "#111111",
                    marginBottom: "30px",
                  },
                  content: { innerText: "Designed for the Modern Minimalist." },
                },
                {
                  id: v4(),
                  name: "H-Btn",
                  type: "button",
                  styles: {
                    width: "fit-content",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "20px 50px",
                    fontWeight: "700",
                    fontSize: "16px",
                  },
                  content: { innerText: "EXPLORE COLLECTION" },
                },
              ],
            },
            {
              id: v4(),
              name: "Hero Image Side",
              type: "image",
              styles: {
                flex: "1.2",
                // minWidth: "400px",
                width: "40%",
                height: "700px",
                objectFit: "cover",
                // top
                objectPosition:"top"
              },
              content: {
                src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
              },
            },
          ],
        },

        // --- 4. FEATURED PRODUCTS (Static Cards) ---
        {
          id: v4(),
          name: "Featured Grid",
          type: "container",
          styles: { padding: "120px 80px", backgroundColor: "#ffffff" },
          content: [
            {
              id: v4(),
              name: "Grid Header",
              type: "h2",
              styles: {
                fontSize: "32px",
                fontWeight: "800",
                marginBottom: "60px",
                textAlign: "center",
                color: "#000000",
              },
              content: { innerText: "TRENDING NOW" },
            },
            {
              id: v4(),
              name: "Card Container",
              type: "container",
              styles: { display: "flex", flexWrap: "wrap", gap: "30px" },
              content: [
                // Product 1
                {
                  id: v4(),
                  name: "Card 1",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "C1-Img",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        backgroundColor: "#f3f3f3",
                      },
                      content: {
                        src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=500",
                      },
                    },
                    {
                      id: v4(),
                      name: "C1-Name",
                      type: "text",
                      styles: {
                        fontWeight: "700",
                        fontSize: "18px",
                        marginTop: "20px",
                        color: "#1a1a1a",
                      },
                      content: { innerText: "Signature Wool Coat" },
                    },
                    {
                      id: v4(),
                      name: "C1-Price",
                      type: "text",
                      styles: {
                        color: "#666",
                        fontSize: "15px",
                        marginTop: "5px",
                      },
                      content: { innerText: "$240.00" },
                    },
                  ],
                },
                // Product 2
                {
                  id: v4(),
                  name: "Card 2",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "C2-Img",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        backgroundColor: "#f3f3f3",
                      },
                      content: {
                        src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500",
                      },
                    },
                    {
                      id: v4(),
                      name: "C2-Name",
                      type: "text",
                      styles: {
                        fontWeight: "700",
                        fontSize: "18px",
                        marginTop: "20px",
                        color: "#1a1a1a",
                      },
                      content: { innerText: "Classic Denim Jacket" },
                    },
                    {
                      id: v4(),
                      name: "C2-Price",
                      type: "text",
                      styles: {
                        color: "#666",
                        fontSize: "15px",
                        marginTop: "5px",
                      },
                      content: { innerText: "$110.00" },
                    },
                  ],
                },
                // Product 3
                {
                  id: v4(),
                  name: "Card 3",
                  type: "container",
                  styles: {
                    flex: "1",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                  },
                  content: [
                    {
                      id: v4(),
                      name: "C3-Img",
                      type: "image",
                      styles: {
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        backgroundColor: "#f3f3f3",
                      },
                      content: {
                        src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500",
                      },
                    },
                    {
                      id: v4(),
                      name: "C3-Name",
                      type: "text",
                      styles: {
                        fontWeight: "700",
                        fontSize: "18px",
                        marginTop: "20px",
                        color: "#1a1a1a",
                      },
                      content: { innerText: "Biker Leather Vest" },
                    },
                    {
                      id: v4(),
                      name: "C3-Price",
                      type: "text",
                      styles: {
                        color: "#666",
                        fontSize: "15px",
                        marginTop: "5px",
                      },
                      content: { innerText: "$195.00" },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // --- 5. CATEGORY SPOTLIGHT ---
        {
          id: v4(),
          name: "Spotlight",
          type: "container",
          styles: {
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#000000",
          },
          content: [
            {
              id: v4(),
              name: "Spotlight Img",
              type: "image",
              styles: {
                flex: "1",
                minWidth: "400px",
                height: "600px",
                objectFit: "cover",
                opacity: "0.8",
              },
              content: {
                src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
              },
            },
            {
              id: v4(),
              name: "Spotlight Text",
              type: "container",
              styles: {
                flex: "1",
                minWidth: "400px",
                padding: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "left",
              },
              content: [
                {
                  id: v4(),
                  name: "S-H2",
                  type: "h2",
                  styles: {
                    color: "#ffffff",
                    fontSize: "48px",
                    fontWeight: "900",
                    marginBottom: "20px",
                  },
                  content: { innerText: "The Summer Edit" },
                },
                {
                  id: v4(),
                  name: "S-P",
                  type: "text",
                  styles: {
                    color: "#cccccc",
                    fontSize: "18px",
                    marginBottom: "40px",
                    lineHeight: "1.6",
                  },
                  content: {
                    innerText:
                      "Lightweight fabrics and breathable silhouettes for the season ahead.",
                  },
                },
                {
                  id: v4(),
                  name: "S-Btn",
                  type: "button",
                  styles: {
                    width: "fit-content",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "18px 40px",
                    fontWeight: "800",
                  },
                  content: { innerText: "SHOP THE EDIT" },
                },
              ],
            },
          ],
        },

        // --- 6. NEWSLETTER (Footer Prep) ---
        {
          id: v4(),
          name: "Newsletter",
          type: "container",
          styles: {
            padding: "120px 80px",
            textAlign: "center",
            backgroundColor: "#ffffff",
          },
          content: [
            {
              id: v4(),
              name: "N-H2",
              type: "h2",
              styles: {
                fontSize: "36px",
                fontWeight: "900",
                color: "#000000",
                marginBottom: "15px",
              },
              content: { innerText: "Join the Inner Circle" },
            },
            {
              id: v4(),
              name: "N-P",
              type: "text",
              styles: {
                fontSize: "16px",
                color: "#666666",
                marginBottom: "40px",
              },
              content: {
                innerText:
                  "Sign up for early access to product launches and sales.",
              },
            },
            {
              id: v4(),
              name: "N-Btn",
              type: "button",
              styles: {
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "16px 60px",
                fontWeight: "700",
                borderRadius: "2px",
              },
              content: { innerText: "SUBSCRIBE NOW" },
            },
          ],
        },
      ],
    },
  ],
};
