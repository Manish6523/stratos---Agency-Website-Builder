const fs = require("fs");
const paper = require("paper");
const { JSDOM } = require("jsdom");

const dom = new JSDOM('<body><canvas id="canvas"></canvas></body>');
paper.setup(dom.window.document.getElementById("canvas"));

let svgContent = fs.readFileSync("public/assets/file.svg", "utf8");

paper.project.importSVG(svgContent, {
  expandShapes: true,
  onLoad: function (item) {
    const simplifyPaths = (curItem) => {
      if (curItem.children) {
        for (let child of curItem.children) {
          simplifyPaths(child);
        }
      } else if (
        curItem.className === "Path" ||
        curItem.className === "CompoundPath"
      ) {
        // Apply aggressive simplification (tolerance = 2.5)
        curItem.simplify(2.5);
      }
    };

    simplifyPaths(item);

    let outSvg = item.exportSVG({ asString: true, precision: 3 });

    // Inject the defs back since paper.js strips them
    const defs = `
  <defs>
    <linearGradient id="g" x1="0" y1="256" x2="0" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="35%" stop-color="#4c1d95"/>
      <stop offset="60%" stop-color="#8b5cf6"/>
      <stop offset="85%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
`;
    // paper.js export format
    outSvg = outSvg.replace(/<svg[^>]*>/, (match) => match + defs);

    // Ensure all paths have the gradient and no stroke issues
    outSvg = outSvg.replace(/fill="url\([^)]*\)"/g, 'fill="url(#g)"');
    // We add a tiny stroke to prevent rendering gaps
    outSvg = outSvg.replace(
      /<path /g,
      '<path stroke="url(#g)" stroke-width="0.5" stroke-linejoin="round" ',
    );

    fs.writeFileSync("public/assets/file.svg", outSvg);
    console.log("SVG simplified and saved.");
  },
});
