const fs = require('fs');
let svg = fs.readFileSync('public/assets/file.svg', 'utf8');

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

// Remove the first path (black fill)
svg = svg.replace(/<path fill="#000000"[\s\S]*?z"\/>\n?/, '');

// Add defs after xml:space="preserve">
svg = svg.replace(/xml:space="preserve">/, 'xml:space="preserve">' + defs);

// Replace all fills with the gradient and add stroke to cover gaps
svg = svg.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="url(#g)" stroke="url(#g)" stroke-width="0.8" stroke-linejoin="round"');

fs.writeFileSync('public/assets/file.svg', svg);
console.log("SVG fixed.");
