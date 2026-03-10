import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const sneakerStoreDP: {
  name: string;
  category: TemplateCategory;
  elements: EditorElement[];
  imageUrl?: string;
} = {
  name: "Sneaker Store Ultimate",
  category: "E-commerce",
  imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
  elements: [
    {
      id: v4(),
      name: "Page Wrapper",
      styles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#ffffff",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#1a1a1a",
      },
      type: "container",
      content: [
        // --- 1. NAV BAR ---
        {
          id: v4(),
          name: "Navbar",
          type: "container",
          styles: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 80px",
            backgroundColor: "#ffffff",
          },
          content: [
            { id: v4(), name: "Logo", type: "text", styles: { fontSize: "24px", fontWeight: "800", color: "#FF5F2E" }, content: { innerText: "S Sneaker" } },
            { 
              id: v4(), 
              name: "Nav links", 
              type: "container", 
              styles: { display: "flex", gap: "30px" },
              content: [
                { id: v4(), name: "L1", type: "link", styles: { fontSize: "14px", fontWeight: "600" }, content: { innerText: "Home", href: "#" } },
                { id: v4(), name: "L2", type: "link", styles: { fontSize: "14px", color: "#666" }, content: { innerText: "Shop", href: "#" } },
                { id: v4(), name: "L3", type: "link", styles: { fontSize: "14px", color: "#666" }, content: { innerText: "Blog", href: "#" } },
              ]
            },
            { id: v4(), name: "Icons", type: "text", styles: { fontSize: "18px" }, content: { innerText: "🔍 🛒 👤" } }
          ]
        },

        // --- 2. HERO SECTION (Hotspots & Large Shoe) ---
        {
          id: v4(),
          name: "Hero Section",
          type: "container",
          styles: {
            display: "flex",
            alignItems: "center",
            padding: "60px 80px",
            backgroundColor: "#f9f9f9",
            minHeight: "700px",
            position: "relative",
            overflow: "hidden"
          },
          content: [
            {
              id: v4(),
              name: "Hero Text",
              type: "container",
              styles: { flex: "1", zIndex: "10" },
              content: [
                { id: v4(), name: "H1", type: "h1", styles: { fontSize: "100px", fontWeight: "800", lineHeight: "0.9", marginBottom: "20px" }, content: { innerText: "Shoes\nCollect !" } },
                { id: v4(), name: "Desc", type: "text", styles: { color: "#666", maxWidth: "400px", marginBottom: "40px", lineHeight: "1.6" }, content: { innerText: "Discover our stylish and comfortable shoes, perfect for every occasion and need." } },
                { id: v4(), name: "CTA", type: "button", styles: { backgroundColor: "#FF5F2E", color: "#fff", padding: "16px 36px", borderRadius: "50px", fontWeight: "600" }, content: { innerText: "Shop Now" } },
                { id: v4(), name: "Brands", type: "text", styles: { marginTop: "40px", color: "#aaa", fontSize: "12px", fontWeight: "700" }, content: { innerText: "PUMA  |  NIKE  |  7+ Brands" } }
              ]
            },
            {
              id: v4(),
              name: "Shoe Showcase",
              type: "container",
              styles: { flex: "1.2", position: "relative", display: "flex", justifyContent: "center" },
              content: [
                { id: v4(), name: "Main Shoe", type: "image", styles: { width: "110%", height: "auto", transform: "rotate(-15deg)", zIndex: "5" }, content: { src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000" } },
                // Hotspot labels (from image)
                { id: v4(), name: "Hotspot1", type: "text", styles: { position: "absolute", top: "10%", right: "20%", backgroundColor: "#fff", padding: "8px 16px", borderRadius: "50px", fontSize: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: "10" }, content: { innerText: "100% Fit Shoelaces" } },
                { id: v4(), name: "Hotspot2", type: "text", styles: { position: "absolute", bottom: "20%", left: "10%", backgroundColor: "#fff", padding: "8px 16px", borderRadius: "50px", fontSize: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: "10" }, content: { innerText: "Air Flow Technology" } }
              ]
            }
          ]
        },

        // --- 3. TRENDING PRODUCTS (Cards) ---
        {
          id: v4(),
          name: "Trending Section",
          type: "container",
          styles: { padding: "100px 80px" },
          content: [
            { id: v4(), name: "Title", type: "h2", styles: { fontSize: "36px", fontWeight: "800", marginBottom: "50px" }, content: { innerText: "Trending Products" } },
            {
              id: v4(),
              name: "Grid",
              type: "container",
              styles: { display: "flex", flexWrap: "wrap", gap: "30px" },
              content: [
                // Product Card 1
                { id: v4(), name: "C1", type: "container", styles: { flex: "1", minWidth: "260px" }, content: [
                    { id: v4(), name: "C1-Box", type: "container", styles: { backgroundColor: "#f6f6f6", padding: "40px", borderRadius: "20px", position: "relative" }, content: [
                        { id: v4(), name: "Img", type: "image", styles: { width: "100%", height: "180px", objectFit: "contain" }, content: { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500" } },
                        { id: v4(), name: "Add", type: "button", styles: { position: "absolute", bottom: "20px", right: "20px", backgroundColor: "#FF5F2E", color: "#fff", width: "40px", height: "40px", borderRadius: "50%" }, content: { innerText: "+" } }
                    ]},
                    { id: v4(), name: "Info", type: "container", styles: { marginTop: "15px" }, content: [
                        { id: v4(), name: "N", type: "text", styles: { fontWeight: "700" }, content: { innerText: "Nike Running Shoe" } },
                        { id: v4(), name: "P", type: "text", styles: { color: "#666", fontSize: "14px" }, content: { innerText: "$349" } }
                    ]}
                ]},
                // Product Card 2
                { id: v4(), name: "C2", type: "container", styles: { flex: "1", minWidth: "260px" }, content: [
                    { id: v4(), name: "C2-Box", type: "container", styles: { backgroundColor: "#f6f6f6", padding: "40px", borderRadius: "20px", position: "relative" }, content: [
                        { id: v4(), name: "Img", type: "image", styles: { width: "100%", height: "180px", objectFit: "contain" }, content: { src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=500" } },
                        { id: v4(), name: "Add", type: "button", styles: { position: "absolute", bottom: "20px", right: "20px", backgroundColor: "#FF5F2E", color: "#fff", width: "40px", height: "40px", borderRadius: "50%" }, content: { innerText: "+" } }
                    ]},
                    { id: v4(), name: "Info", type: "container", styles: { marginTop: "15px" }, content: [
                        { id: v4(), name: "N", type: "text", styles: { fontWeight: "700" }, content: { innerText: "Nike Shoe Airmax" } },
                        { id: v4(), name: "P", type: "text", styles: { color: "#666", fontSize: "14px" }, content: { innerText: "$349" } }
                    ]}
                ]}
              ]
            }
          ]
        },

        // --- 4. BRAND VALUE SECTION ---
        {
          id: v4(),
          name: "Value Section",
          type: "container",
          styles: { display: "flex", backgroundColor: "#000", color: "#fff", padding: "100px 80px", alignItems: "center", gap: "80px" },
          content: [
            { id: v4(), name: "L", type: "image", styles: { flex: "1", borderRadius: "30px", height: "500px", objectFit: "cover" }, content: { src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800" } },
            { id: v4(), name: "R", type: "container", styles: { flex: "1" }, content: [
                { id: v4(), name: "H", type: "h2", styles: { fontSize: "48px", fontWeight: "800", marginBottom: "30px" }, content: { innerText: "Why Choose Us?" } },
                { id: v4(), name: "T", type: "text", styles: { color: "#aaa", lineHeight: "1.8", marginBottom: "40px" }, content: { innerText: "Our products are crafted to order in small batches and shipped directly to you. There's never unsold inventory or markups." } },
                { id: v4(), name: "B", type: "button", styles: { border: "1px solid #fff", padding: "14px 30px", borderRadius: "50px", fontSize: "14px" }, content: { innerText: "Learn More" } }
            ]}
          ]
        }
      ]
    }
  ]
};