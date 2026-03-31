"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/providers/editor/editor-provider";
import {
  Loader2,
  Sparkles,
  Wand2,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

// ─── Example Prompts ────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  {
    label: "🏔️ Hero Section",
    prompt:
      "Create a breathtaking hero section that commands immediate attention. Use a bold, oversized heading with a strong typographic hierarchy — the main headline should feel monumental and confident. Below it, add a softer subtitle in a lighter weight that provides context. Include a vibrant gradient background that flows from deep indigo through violet to a warm magenta, creating a sense of depth and energy. Place a prominent 'Get Started' call-to-action button with rounded corners, a subtle shadow, and a hover glow effect. Add supporting text beneath the CTA that feels reassuring. The entire section should breathe with generous padding and feel like the opening shot of a cinematic experience.",
  },
  {
    label: "💳 Pricing Cards",
    prompt:
      "Design a sophisticated pricing section with a compelling value proposition. Start with a centered heading 'Choose Your Plan' and a muted subtitle. Create a 3-column layout where each card has distinct visual weight — the middle 'Pro' card should feel elevated and premium with a highlighted border or badge. Each card should contain: a plan name heading, a large price figure, a list of features as clean text elements with subtle check marks, and a 'Choose Plan' button. Use a dark charcoal background with cards in lighter dark tones to create depth. The cards should have rounded corners, subtle borders, and a gentle hover lift effect. Typography should be clean and hierarchical.",
  },
  {
    label: "⭐ Testimonials",
    prompt:
      "Build an elegant testimonials section that builds trust and credibility. Use a 2-column layout with customer testimonials that feel genuine and impactful. Each testimonial should include a large opening quotation mark as a decorative element, the customer's quote in a readable serif or elegant sans-serif, a star rating using icon blocks, and the author's name with their role. Use a warm, light background with subtle texture. Add generous spacing between testimonials and a section heading that reads 'What Our Clients Say'. The overall feel should be that of a premium magazine endorsement page — sophisticated, trustworthy, and warm.",
  },
  {
    label: "🧩 Feature Grid",
    prompt:
      "Create an impressive features grid that showcases capabilities with visual clarity. Lead with a centered heading 'Why Choose Us' in bold weight, and a supporting paragraph beneath. Build a 3-column grid layout where each feature cell contains: an icon block (use icons like shield-check, zap, layers), a short bold heading, and 2–3 lines of descriptive text. Each cell should have generous internal padding, a subtle background hover effect, and clean visual separation. The section background should use a soft gradient from white to a very light gray. Typography should feel modern and confident — headings in a heavier weight, body text in a comfortable reading weight.",
  },
  {
    label: "📣 CTA Banner",
    prompt:
      "Design an eye-catching call-to-action banner that creates urgency and excitement. Use a bold, vibrant gradient background that transitions from electric blue through purple to a warm coral — the gradient should feel dynamic and alive. The main heading should be large and white with strong contrast, conveying a clear value proposition like 'Ready to Transform Your Business?'. Below it, add supporting text that addresses potential hesitation. Include two buttons side by side: a bright primary 'Start Free Trial' button with a glowing effect and a softer secondary 'Learn More' outlined button. The entire section should have generous padding and feel like a confident invitation.",
  },
  {
    label: "🦶 Footer",
    prompt:
      "Build a professional, comprehensive footer that feels complete and trustworthy. Use a deep dark background with a 3-column layout. The first column contains the company name in bold as a text heading, a brief company description in muted light gray, and subtle social media links. The second column has a 'Quick Links' heading with a stack of navigation links beneath. The third column shows 'Contact' info with email, phone, and address as readable text. Add a thin divider line followed by a copyright notice at the bottom. Typography should be light-weight and airy on the dark background, using warm off-white tones rather than pure white.",
  },
  {
    label: "🌟 Full Landing Page",
    prompt:
      "Generate a complete ONE-PAGE LANDING PAGE that tells a compelling visual story from top to bottom. Start with a bold hero section with a gradient background, a punchy headline, supporting copy, and a prominent CTA. Follow with a social proof bar. Then a features section in a 3-column layout with icon blocks and descriptions. Add a testimonial section with customer quotes. Include a visual stats/metrics section with progress bars showing achievements. Close with a strong call-to-action banner and a dark professional footer. The entire page should flow as a single cohesive narrative — each section building on the previous one, guiding the visitor toward conversion with increasing confidence and urgency.",
  },
];

type Props = {};

const AiBuilderTab = (props: Props) => {
  const { state, dispatch } = useEditor();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      const isSpecificSelected =
        state.editor.selectedElement.id !== "__body" &&
        state.editor.selectedElement.type !== null;

      const response = await fetch("/api/generate-layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          selectedElement: isSpecificSelected
            ? state.editor.selectedElement
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate layout");
      }

      if (
        isSpecificSelected &&
        data.element.id === state.editor.selectedElement.id
      ) {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            elementDetails: data.element,
          },
        });
        toast.success("Element updated successfully!");
      } else {
        const targetContainerId =
          state.editor.selectedElement.type === "container" ||
          state.editor.selectedElement.type === "2Col"
            ? state.editor.selectedElement.id
            : "__body";

        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: targetContainerId,
            elementDetails: data.element,
          },
        });
        toast.success("Layout generated successfully!");
      }

      setPrompt("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to generate layout");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Write something first, then enhance it!");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert web design prompt engineer specializing in creating detailed, atmospheric design descriptions for AI website builders.

The user wrote a brief prompt for an AI website builder that generates layout blocks (containers, text, images, buttons, headings, icons, progress bars, testimonials, sliders, etc.).

Original prompt: "${prompt}"

Your task: Transform this into a rich, detailed, THREE-PARAGRAPH design description that focuses on FEELING and ATMOSPHERE:

Paragraph 1: Describe the core emotional qualities and visual atmosphere. What mood should visitors experience? How should the visual hierarchy and flow make them feel? What colorful elements and gradients would enhance the emotional impact?

Paragraph 2: Explain the design philosophy through typography and interactions. How should headings feel — authoritative, welcoming, cutting-edge? What sensation should hover effects and animations create? Describe the emotional progression from first impression through the content.

Paragraph 3: Provide abstract reference points that capture the aesthetic's essence — think about types of spaces, architectural styles, or artistic movements that embody this feeling. Reference the emotional qualities of premium experiences that should inspire the design.

Return ONLY the enhanced prompt text, nothing else. No preamble, no explanation. Keep it under 350 words. Focus on creating an atmosphere-rich prompt that will produce an extraordinary, premium design.`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance prompt");
      }

      if (data.text) {
        setPrompt(data.text);
        toast.success("Prompt enhanced with rich detail!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const isSpecificSelected =
    state.editor.selectedElement.id !== "__body" &&
    state.editor.selectedElement.type !== null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with gradient */}
      <div className="relative overflow-hidden px-6 pt-6 pb-4 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">AI Builder</h3>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Describe it. We&apos;ll build it.
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3 px-6 pb-6">
          {/* Context indicator */}
          {isSpecificSelected && (
            <div className="px-3 py-2 rounded-lg bg-accent border border-border text-xs text-accent-foreground flex items-center gap-2">
              <Zap size={12} className="shrink-0 text-primary" />
              <span>
                Editing:{" "}
                <strong className="font-semibold">
                  {state.editor.selectedElement.name}
                </strong>
              </span>
            </div>
          )}

          {/* Prompt Textarea */}
          <div className="relative group">
            <textarea
              className="w-full bg-muted/50 border border-border p-3 rounded-xl h-32 text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary
                placeholder:text-muted-foreground/50 transition-all"
              placeholder={
                isSpecificSelected
                  ? `Describe changes for "${state.editor.selectedElement.name}"...`
                  : "Describe the section or full page you want to build..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/40">
              {prompt.length}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEnhancePrompt}
              disabled={isEnhancing || !prompt.trim()}
              className="flex items-center gap-1.5 text-xs h-8 rounded-lg border-dashed hover:border-primary hover:bg-primary/5 transition-all"
            >
              {isEnhancing ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Zap size={12} className="text-primary" />
                  Enhance
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExamples(!showExamples)}
              className={`flex items-center gap-1.5 text-xs h-8 rounded-lg transition-all ${
                showExamples
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-dashed hover:border-primary hover:bg-primary/5"
              }`}
            >
              <Wand2 size={12} className="text-primary" />
              Examples
              {showExamples ? (
                <ChevronUp size={10} />
              ) : (
                <ChevronDown size={10} />
              )}
            </Button>
          </div>

          {/* Example Prompts */}
          {showExamples && (
            <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
              {EXAMPLE_PROMPTS.map((example) => (
                <button
                  key={example.label}
                  onClick={() => {
                    setPrompt(example.prompt);
                    setShowExamples(false);
                  }}
                  className="group flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-border bg-muted/30
                    hover:bg-primary/5 hover:border-primary/30 transition-all text-left"
                >
                  <Sparkles
                    size={12}
                    className="text-muted-foreground group-hover:text-primary shrink-0 mt-0.5 transition-colors"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {example.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground leading-tight line-clamp-2">
                      {example.prompt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl
              shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Building your layout...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Section
              </>
            )}
          </Button>

          {/* Context tip */}
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            {isSpecificSelected
              ? "AI will modify the selected element. Select Body to generate new sections."
              : "Tip: Select a container to insert within it, or use Body for full sections."}
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AiBuilderTab;
