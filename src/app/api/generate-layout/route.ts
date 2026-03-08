import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt, selectedElement } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API Key is not configured" },
        { status: 500 },
      );
    }

    const systemPrompt = `You are an expert web designer assisting a user in a drag-and-drop website builder. 
The user wants to accomplish the following based on this prompt: "${prompt}"

${
  selectedElement
    ? `The user currently has the following element selected in the editor:
${JSON.stringify(selectedElement, null, 2)}

Your task is to modify this exact element based on the user's prompt. 
If the prompt asks to modify styling, update the 'styles' object.
If the prompt asks to update content, update 'content' (which can be a object or an array of children).
If the prompt asks to add new elements inside it, append them to the 'content' array.
IMPORTANT: You MUST return the modified element object. Keep its original 'id', 'name', and 'type'. Return ONLY the modified JSON object for this element.`
    : `Your task is to generate a completely new layout block.
Wrap everything in one root "container" element. It must look nice, have padding, a background color, etc.
Generate meaningful default copy for texts, headings, and buttons.`
}

Return ONLY valid JSON representing the layout block. No markdown wrappers.

Structure Types:

**1. Basic Layouts**
- container: A layout box that can hold other elements inside its 'content' array. Minimum padding is recommended.
- 2Col: A two-column grid. Its 'content' MUST be an array of exactly two 'container' elements. Styles MUST include {"display": "flex"}.
- 3Col: A three-column grid. Its 'content' MUST be an array of exactly three 'container' elements. Styles MUST include {"display": "flex"}.
- divider: A horizontal dividing line. (content: [])

**2. Typography (Basic)**
- text: A paragraph of text. (content MUST be an object: { innerText: "..." })
- h1: Large heading. (content: { innerText: "..." })
- h2: Medium heading. (content: { innerText: "..." })
- h3: Small heading. (content: { innerText: "..." })
- link: A clickable link. (content: { innerText: "...", href: "..." })
- button: Call to action button. (content: { innerText: "...", href: "..." })

**3. Media**
- image: An image block. (content: { src: "https://picsum.photos/800/400" })
- video: A youtube video embed. (content: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ" })

**4. Advanced UI Components**
- slider: An image carousel. (content: { sliderImages: ["url1", "url2", "url3"] })
- progressBar: A completion bar. (content: { progressValue: 75, progressColor: "#2563eb", progressBackground: "#e2e8f0" })
- testimonial: A customer quote block. (content: { innerText: "...", authorName: "..." })
- iconBlock: A dynamic lucide-react icon display. (content: { innerText: "...", icon: "shield-check" })

**5. Forms & Code**
- contactForm: A full contact form block. (content: [])
- paymentForm: A checkout form block. (content: [])
- customEmbed: A raw HTML block. Use only in-line CSS; no external scripts or external assets are allowed. (content: { customCode: "<div style='padding: 20px; background-color: #f3f4f6; border-radius: 8px;'><h2 style='color: #1f2937;'>Custom Embed</h2><p style='color: #4b5563;'>This is a custom HTML block with inline styles.</p></div>" })

Guidelines:
1. Use valid Tailwind-like styling via standard CSS properties in camelCase [camelCase is most important] (e.g., backgroundColor, padding, display, flexDirection, maxWidth).
2. Use realistic placeholder URLs for images if needed (e.g., https://picsum.photos/200/300?random=1).
3. Each new element object MUST follow this schema exactly:
{
  "id": "(generate a unique random string for each new element. Do NOT change existing IDs)",
  "name": "(a descriptive name like 'Hero Section', 'Subheading', 'Pill Button')",
  "type": "(must be one of the Structure Types listed above)",
  "styles": { "(React.CSSProperties object)": "value" },
  "content": (Either an array of child elements, OR an object like {"innerText": "...", "href": "...", "src": "..."})
}

Return ONLY valid JSON. No markdown wrappers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    // Attempt to parse the valid JSON
    let layoutData;
    try {
      layoutData = JSON.parse(response.text.trim());
    } catch (err) {
      console.error("Failed to parse JSON:", response.text);
      throw new Error("AI returned malformed JSON");
    }

    return NextResponse.json({ element: layoutData });
  } catch (error) {
    console.error("Error generating layout:", error);
    return NextResponse.json(
      { error: "Failed to generate layout" },
      { status: 500 },
    );
  }
}
