import { NextResponse } from "next/server";

type EditorElement = {
  id: string;
  styles: Record<string, string>;
  name: string;
  type: string | null;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string;
        src?: string;
        customCode?: string;
        strokeWidth?: string;
        alt?: string;
        authorName?: string;
        icon?: string;
        title?: string;
        sliderImages?: string[];
        progressValue?: number;
        progressColor?: string;
        progressBackground?: string;
      };
};

function stylesToCSS(styles: Record<string, string>): string {
  if (!styles || typeof styles !== "object") return "";
  return Object.entries(styles)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `  ${kebab}: ${value};`;
    })
    .join("\n");
}

function sanitizeClassName(id: string): string {
  return `el-${id.replace(/[^a-zA-Z0-9-_]/g, "-")}`;
}

function generateCSS(
  elements: EditorElement[],
  classes: Map<string, string>
): void {
  for (const el of elements) {
    const css = stylesToCSS(el.styles);
    if (css) {
      classes.set(sanitizeClassName(el.id), css);
    }
    if (Array.isArray(el.content)) {
      generateCSS(el.content, classes);
    }
  }
}

function elementToHTML(el: EditorElement, indent: number = 2): string {
  const pad = " ".repeat(indent);
  const className = sanitizeClassName(el.id);
  const content = el.content;

  switch (el.type) {
    case "__body":
    case "container":
    case "2Col":
    case "3Col":
    case "grid": {
      const children = Array.isArray(content)
        ? content.map((child) => elementToHTML(child, indent + 2)).join("\n")
        : "";
      const tag = el.type === "__body" ? "main" : "div";
      return `${pad}<${tag} class="${className}">\n${children}\n${pad}</${tag}>`;
    }

    case "text": {
      const text =
        !Array.isArray(content) && content?.innerText
          ? content.innerText
          : "Text";
      return `${pad}<p class="${className}">${text}</p>`;
    }

    case "h1":
    case "h2":
    case "h3": {
      const text =
        !Array.isArray(content) && content?.innerText
          ? content.innerText
          : "Heading";
      return `${pad}<${el.type} class="${className}">${text}</${el.type}>`;
    }

    case "link": {
      const text =
        !Array.isArray(content) && content?.innerText
          ? content.innerText
          : "Link";
      const href =
        !Array.isArray(content) && content?.href ? content.href : "#";
      return `${pad}<a href="${href}" class="${className}">${text}</a>`;
    }

    case "button": {
      const text =
        !Array.isArray(content) && content?.innerText
          ? content.innerText
          : "Button";
      const href =
        !Array.isArray(content) && content?.href ? content.href : "#";
      return `${pad}<a href="${href}" class="${className}" role="button">${text}</a>`;
    }

    case "image": {
      const src =
        !Array.isArray(content) && content?.src ? content.src : "";
      const alt =
        !Array.isArray(content) && content?.alt ? content.alt : el.name;
      return `${pad}<img src="${src}" alt="${alt}" class="${className}" />`;
    }

    case "video": {
      const src =
        !Array.isArray(content) && content?.src ? content.src : "";
      return `${pad}<div class="${className}">
${pad}  <iframe src="${src}" frameborder="0" allowfullscreen style="width:100%;height:100%;min-height:315px;"></iframe>
${pad}</div>`;
    }

    case "divider": {
      return `${pad}<hr class="${className}" />`;
    }

    case "customEmbed": {
      const code =
        !Array.isArray(content) && content?.customCode
          ? content.customCode
          : "";
      return `${pad}<div class="${className}">${code}</div>`;
    }

    case "testimonial": {
      const text =
        !Array.isArray(content) && content?.innerText
          ? content.innerText
          : "";
      const author =
        !Array.isArray(content) && content?.authorName
          ? content.authorName
          : "Anonymous";
      return `${pad}<blockquote class="${className}">
${pad}  <p>"${text}"</p>
${pad}  <footer>— ${author}</footer>
${pad}</blockquote>`;
    }

    case "progressBar": {
      const value =
        !Array.isArray(content) && content?.progressValue !== undefined
          ? content.progressValue
          : 50;
      const color =
        !Array.isArray(content) && content?.progressColor
          ? content.progressColor
          : "#2563eb";
      const bg =
        !Array.isArray(content) && content?.progressBackground
          ? content.progressBackground
          : "#e2e8f0";
      return `${pad}<div class="${className}" style="background:${bg};border-radius:8px;overflow:hidden;height:12px;">
${pad}  <div style="width:${value}%;background:${color};height:100%;border-radius:8px;transition:width 0.3s;"></div>
${pad}</div>`;
    }

    case "slider": {
      const images =
        !Array.isArray(content) && content?.sliderImages
          ? content.sliderImages
          : [];
      const slides = images
        .map(
          (src: string) =>
            `${pad}  <img src="${src}" alt="Slide" style="width:100%;height:auto;object-fit:cover;" />`
        )
        .join("\n");
      return `${pad}<div class="${className}">
${slides || `${pad}  <!-- No slider images -->`}
${pad}</div>`;
    }

    case "iconBlock": {
      const icon =
        !Array.isArray(content) && content?.icon ? content.icon : "⭐";
      return `${pad}<div class="${className}">
${pad}  <span style="font-size:inherit;">${icon}</span>
${pad}</div>`;
    }

    case "contactForm": {
      return `${pad}<form class="${className}">
${pad}  <input type="text" placeholder="Name" style="width:100%;padding:8px 12px;margin-bottom:8px;border:1px solid #ccc;border-radius:6px;" />
${pad}  <input type="email" placeholder="Email" style="width:100%;padding:8px 12px;margin-bottom:8px;border:1px solid #ccc;border-radius:6px;" />
${pad}  <textarea placeholder="Message" rows="4" style="width:100%;padding:8px 12px;margin-bottom:8px;border:1px solid #ccc;border-radius:6px;resize:vertical;"></textarea>
${pad}  <button type="submit" style="padding:10px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;">Send Message</button>
${pad}</form>`;
    }

    case "paymentForm": {
      return `${pad}<div class="${className}">
${pad}  <!-- Payment form placeholder -->
${pad}  <p>Payment form will be configured separately.</p>
${pad}</div>`;
    }

    default:
      return `${pad}<!-- Unknown element type: ${el.type} -->`;
  }
}

export async function POST(req: Request) {
  try {
    const { elements, pageTitle } = await req.json();

    if (!elements || !Array.isArray(elements)) {
      return NextResponse.json(
        { error: "Elements array is required" },
        { status: 400 }
      );
    }

    // Generate CSS classes
    const classes = new Map<string, string>();
    generateCSS(elements, classes);

    // Build CSS string
    let css = `/* Generated by Stratos - Agency Website Builder */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: inherit;
}

`;

    for (const [className, styles] of classes) {
      css += `.${className} {\n${styles}\n}\n\n`;
    }

    // Generate HTML
    const htmlBody = elements
      .map((el) => elementToHTML(el as EditorElement))
      .join("\n");

    const title = pageTitle || "Exported Page";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${css}
  </style>
</head>
<body>
${htmlBody}
</body>
</html>`;

    return NextResponse.json({ html, css });
  } catch (error) {
    console.error("Error exporting HTML:", error);
    return NextResponse.json(
      { error: "Failed to export HTML" },
      { status: 500 }
    );
  }
}
