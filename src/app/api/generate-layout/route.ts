import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { v4 } from "uuid";

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert web designer assisting a user in a drag-and-drop website builder. 
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
- container: A layout box that can hold other elements.
- 2Col: A two-column grid layout element (its content array must have exactly two 'container' elements).
- text: A generic paragraph of text. (innerText, color, fontSize)
- h1: A large heading. (innerText, color, fontSize, fontWeight)
- h2: A medium heading. (innerText, color, fontSize, fontWeight)
- h3: A small heading. (innerText, color, fontSize, fontWeight)
- link: A clickable text link. (innerText, href, color)
- button: A standalone button. (innerText, backgroundColor, color, padding)
- image: An image block. (src, alt)
- video: A video block. (src)
- divider: A horizontal line.

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

Return ONLY valid JSON. No markdown wrappers.`,
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
      layoutData = JSON.parse(response.text);
    } catch (err) {
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
