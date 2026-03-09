import { EditorElement } from "@/providers/editor/editor-provider";
import { v4 } from "uuid";
import { TemplateCategory } from "../../templates";

export const streetwearCommerce: {
  name: string;
  category: TemplateCategory;
  elements: EditorElement[];
  imageUrl?: string;
} = {
  name: "Streetwear Cyber Store",
  category: "E-commerce",
  imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
  elements: [
    {
      id: v4(),
      name: "Streetwear Wrapper",
      styles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#0a0a0a", // Deep Midnight
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#ffffff",
      },
      type: "container",
      content: [
        // --- 1. UTILITY TAPE (Top Bar) ---
        {
          id: v4(),
          name: "Utility Tape",
          type: "text",
          styles: {
            backgroundColor: "#ccff00", // Neon Volt
            color: "#000000",
            padding: "10px",
            fontSize: "11px",
            textAlign: "center",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          },
          content: { innerText: "SYSTEM NOTIFICATION: DROP 004 IS NOW LIVE // SECURE THE CARGO" },
        },

        // --- 2. BRUTALIST NAV ---
        {
          id: v4(),
          name: "Main Nav",
          type: "container",
          styles: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "30px 60px",
            borderBottom: "2px solid #333",
          },
          content: [
            { id: v4(), name: "Brand", type: "text", styles: { fontSize: "32px", fontWeight: "900", fontStyle: "italic", color: "#ccff00" }, content: { innerText: "NEON_VXD" } },
            { 
              id: v4(), 
              name: "Links", 
              type: "container", 
              styles: { display: "flex", gap: "50px" },
              content: [
                { id: v4(), name: "Link A", type: "link", styles: { fontSize: "14px", fontWeight: "700", color: "#888" }, content: { innerText: "[ ARCHIVE ]", href: "#" } },
                { id: v4(), name: "Link B", type: "link", styles: { fontSize: "14px", fontWeight: "700", color: "#888" }, content: { innerText: "[ TACTICAL ]", href: "#" } },
              ]
            },
            { id: v4(), name: "Inventory", type: "button", styles: { backgroundColor: "transparent", color: "#ccff00", border: "2px solid #ccff00", padding: "12px 24px", fontWeight: "900", fontSize: "12px" }, content: { innerText: "ACCESS_CART (0)" } }
          ]
        },

        // --- 3. ASYMMETRICAL HERO ---
        {
          id: v4(),
          name: "Cyber Hero",
          type: "container",
          styles: { display: "flex", flexWrap: "wrap", padding: "60px" },
          content: [
            {
              id: v4(),
              name: "Hero Visual",
              type: "image",
              styles: { flex: "1.5", minWidth: "400px", height: "600px", objectFit: "cover", border: "4px solid #ccff00" },
              content: { src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000" }
            },
            {
              id: v4(),
              name: "Hero Copy",
              type: "container",
              styles: { flex: "1", minWidth: "350px", padding: "60px", display: "flex", flexDirection: "column", justifyContent: "flex-end" },
              content: [
                { id: v4(), name: "H-Code", type: "text", styles: { color: "#555", fontSize: "12px", marginBottom: "10px" }, content: { innerText: "MODEL_REF: 99-X-B" } },
                { id: v4(), name: "H-H1", type: "h1", styles: { fontSize: "80px", lineHeight: "0.9", fontWeight: "900", marginBottom: "30px", textTransform: "uppercase" }, content: { innerText: "FUTURE PROOF GEAR." } },
                { id: v4(), name: "H-Btn", type: "button", styles: { backgroundColor: "#ccff00", color: "#000", padding: "24px", fontWeight: "900", width: "100%", fontSize: "18px" }, content: { innerText: "ACQUIRE NOW" } }
              ]
            }
          ]
        },

        // --- 4. THE TECH-GRID (Products) ---
        {
          id: v4(),
          name: "Grid Wrapper",
          type: "container",
          styles: { padding: "100px 60px" },
          content: [
            { id: v4(), name: "Title", type: "h2", styles: { fontSize: "40px", fontWeight: "900", marginBottom: "50px", color: "#ffffff" }, content: { innerText: "// LATEST_EQUIPMENT" } },
            {
              id: v4(),
              name: "Grid",
              type: "container",
              styles: { display: "flex", flexWrap: "wrap", gap: "20px" },
              content: [
                // PRODUCT 01
                {
                  id: v4(),
                  name: "P1",
                  type: "container",
                  styles: { flex: "1", minWidth: "300px", border: "1px solid #333", padding: "20px" },
                  content: [
                    { id: v4(), name: "P1-Img", type: "image", styles: { width: "100%", height: "350px", objectFit: "cover", filter: "grayscale(100%) contrast(120%)" }, content: { src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a991?q=80&w=500" } },
                    { id: v4(), name: "P1-Name", type: "text", styles: { fontSize: "20px", fontWeight: "900", marginTop: "20px" }, content: { innerText: "TECH-OVERSIZED HOODIE" } },
                    { id: v4(), name: "P1-Price", type: "text", styles: { color: "#ccff00", fontSize: "16px", fontWeight: "700" }, content: { innerText: "89.00 USD" } }
                  ]
                },
                // PRODUCT 02
                {
                  id: v4(),
                  name: "P2",
                  type: "container",
                  styles: { flex: "1", minWidth: "300px", border: "1px solid #333", padding: "20px", backgroundColor: "#111" },
                  content: [
                    { id: v4(), name: "P2-Img", type: "image", styles: { width: "100%", height: "350px", objectFit: "cover" }, content: { src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500" } },
                    { id: v4(), name: "P2-Name", type: "text", styles: { fontSize: "20px", fontWeight: "900", marginTop: "20px" }, content: { innerText: "CARGO_V2 TROUSERS" } },
                    { id: v4(), name: "P2-Price", type: "text", styles: { color: "#ccff00", fontSize: "16px", fontWeight: "700" }, content: { innerText: "120.00 USD" } }
                  ]
                }
              ]
            }
          ]
        },

        // --- 5. DECRYPTED FOOTER ---
        {
          id: v4(),
          name: "Footer",
          type: "container",
          styles: { padding: "80px 60px", borderTop: "4px solid #ccff00", backgroundColor: "#000" },
          content: [
            { id: v4(), name: "F-H3", type: "h3", styles: { fontSize: "24px", fontWeight: "900", marginBottom: "20px" }, content: { innerText: "JOIN_THE_NETWORK" } },
            { 
              id: v4(), 
              name: "Input", 
              type: "container", 
              styles: { display: "flex", borderBottom: "2px solid #333", padding: "10px 0", maxWidth: "400px" },
              content: [
                { id: v4(), name: "Text", type: "text", styles: { color: "#555", flex: "1" }, content: { innerText: "ENTER_EMAIL_FOR_ACCESS" } },
                { id: v4(), name: "Btn", type: "button", styles: { color: "#ccff00", fontWeight: "900" }, content: { innerText: "[ SEND ]" } }
              ]
            }
          ]
        }
      ]
    }
  ]
};