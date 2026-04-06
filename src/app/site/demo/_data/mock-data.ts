import { EditorElement } from "@/providers/editor/editor-provider";
import { EditorBtns } from "@/lib/constants";

const now = new Date();

// ─── Pre-built Editor Elements ──────────────────────────────────
export const DEMO_ELEMENTS: EditorElement[] = [
  {
    id: "__body",
    name: "Body",
    type: "__body" as EditorBtns,
    styles: {},
    content: [
      {
        id: "hero-container",
        name: "Hero Section",
        type: "container" as EditorBtns,
        styles: {
          padding: "60px 40px",
          textAlign: "center" as const,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: "16px",
        },
        content: [
          {
            id: "heading-1", name: "Heading", type: "h1" as EditorBtns,
            styles: { color: "white", fontSize: "48px", fontWeight: "800", lineHeight: "1.1" },
            content: { innerText: "Welcome to Our Agency" },
          },
          {
            id: "text-1", name: "Subheading", type: "text" as EditorBtns,
            styles: { color: "rgba(255,255,255,0.85)", fontSize: "20px", maxWidth: "600px", lineHeight: "1.6" },
            content: { innerText: "We build amazing digital experiences that help businesses grow and thrive." },
          },
          {
            id: "button-1", name: "CTA Button", type: "button" as EditorBtns,
            styles: { background: "white", color: "#764ba2", padding: "14px 36px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "none", cursor: "pointer", marginTop: "8px" },
            content: { innerText: "Get in Touch", href: "#" },
          },
        ],
      },
      {
        id: "features-container",
        name: "Features Section",
        type: "container" as EditorBtns,
        styles: { padding: "60px 40px", background: "#fafafa", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "40px" },
        content: [
          {
            id: "features-heading", name: "Section Title", type: "h2" as EditorBtns,
            styles: { color: "#1a1a1a", fontSize: "36px", fontWeight: "700", textAlign: "center" as const },
            content: { innerText: "Why Choose Us?" },
          },
          {
            id: "features-row", name: "Features Row", type: "2Col" as EditorBtns,
            styles: { display: "flex", gap: "24px", width: "100%", maxWidth: "900px" },
            content: [
              {
                id: "feature-1", name: "Feature Card", type: "container" as EditorBtns,
                styles: { flex: "1", background: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center" as const },
                content: [
                  { id: "f1-title", name: "Title", type: "h3" as EditorBtns, styles: { fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }, content: { innerText: "⚡ Lightning Fast" } },
                  { id: "f1-desc", name: "Desc", type: "text" as EditorBtns, styles: { fontSize: "14px", color: "#666", lineHeight: "1.6" }, content: { innerText: "Optimized performance that keeps visitors engaged." } },
                ],
              },
              {
                id: "feature-2", name: "Feature Card", type: "container" as EditorBtns,
                styles: { flex: "1", background: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center" as const },
                content: [
                  { id: "f2-title", name: "Title", type: "h3" as EditorBtns, styles: { fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }, content: { innerText: "🎨 Beautiful Design" } },
                  { id: "f2-desc", name: "Desc", type: "text" as EditorBtns, styles: { fontSize: "14px", color: "#666", lineHeight: "1.6" }, content: { innerText: "Stunning visuals crafted to make your brand shine." } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// ─── Demo FunnelPage Details ────────────────────────────────────
export const DEMO_PAGE_DETAILS = {
  id: "demo-page-id",
  name: "Demo Landing Page",
  pathName: "demo",
  order: 0,
  content: JSON.stringify(DEMO_ELEMENTS),
  funnelId: "demo-funnel",
  published: true,
  createdAt: now,
  updatedAt: now,
  customName: "Demo Builder",
  customFavicon: null,
  visits: 0,
  previewImage: null,
};
