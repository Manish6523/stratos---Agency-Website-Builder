import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are the official AI Assistant for Stratos. 
Stratos is an all-in-one agency solution and website builder. 
It allows agencies to manage subaccounts, build visual funnels/websites with drag-and-drop elements, manage billing, create custom domains, and more.
Be helpful, concise, and friendly. If you don't know the answer, say so politely.
Keep answers relatively short as they will be displayed in a small chat widget.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API Key is not configured" },
        { status: 500 },
      );
    }

    // Combine system prompt and user message
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAI:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 },
    );
  }
}
