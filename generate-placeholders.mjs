// generate-placeholders.mjs
// Run: node generate-placeholders.mjs
// Creates 6 beautiful SVG placeholder images in /public/images/

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'public', 'images');

const placeholders = [
  {
    name: 'photo1',
    gradient: ['#ffb3d1', '#e75480'],
    icon: '🌸',
    label: 'Always radiant',
    bg: '#fff0f5',
  },
  {
    name: 'photo2',
    gradient: ['#ffc8dc', '#d94080'],
    icon: '💗',
    label: 'The best memories',
    bg: '#ffe4ee',
  },
  {
    name: 'photo3',
    gradient: ['#ffaacb', '#e75480'],
    icon: '✨',
    label: 'Simply magical',
    bg: '#fff5f8',
  },
  {
    name: 'photo4',
    gradient: ['#f9a8c9', '#c97fa0'],
    icon: '🎀',
    label: 'Every moment with you',
    bg: '#ffeef4',
  },
  {
    name: 'photo5',
    gradient: ['#ffd6e7', '#e75480'],
    icon: '😊',
    label: 'Unforgettable smiles',
    bg: '#fff0f5',
  },
  {
    name: 'photo6',
    gradient: ['#ffb3d1', '#c97fa0'],
    icon: '💫',
    label: 'Forever cherished',
    bg: '#ffe4ee',
  },
];

for (const p of placeholders) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${p.bg}"/>
      <stop offset="100%" stop-color="${p.gradient[0]}"/>
    </radialGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.gradient[0]}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${p.gradient[1]}" stop-opacity="0.3"/>
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="600" height="450" fill="url(#bg)"/>
  <!-- Blobs -->
  <circle cx="80" cy="80" r="120" fill="${p.gradient[0]}" opacity="0.3" filter="url(#blur)"/>
  <circle cx="520" cy="370" r="100" fill="${p.gradient[1]}" opacity="0.25" filter="url(#blur)"/>
  <circle cx="500" cy="100" r="80" fill="${p.gradient[0]}" opacity="0.2" filter="url(#blur)"/>
  <circle cx="100" cy="380" r="90" fill="${p.gradient[1]}" opacity="0.2" filter="url(#blur)"/>
  <!-- Glass card -->
  <rect x="120" y="100" width="360" height="250" rx="24" fill="url(#card)" opacity="0.7"/>
  <rect x="120" y="100" width="360" height="250" rx="24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
  <!-- Icon placeholder circle -->
  <circle cx="300" cy="195" r="52" fill="rgba(255,255,255,0.35)"/>
  <circle cx="300" cy="195" r="52" fill="none" stroke="rgba(255,182,193,0.5)" stroke-width="1.5"/>
  <!-- Emoji text -->
  <text x="300" y="212" text-anchor="middle" font-size="46" font-family="Segoe UI Emoji,Apple Color Emoji,sans-serif">${p.icon}</text>
  <!-- Label -->
  <text x="300" y="295" text-anchor="middle" font-size="17" font-family="Georgia,serif" font-style="italic" fill="${p.gradient[1]}" opacity="0.85">${p.label}</text>
  <!-- Bottom tag -->
  <text x="300" y="330" text-anchor="middle" font-size="12" font-family="Arial,sans-serif" fill="rgba(100,50,70,0.45)" letter-spacing="3">ADD YOUR PHOTO HERE</text>
  <!-- Sparkle dots -->
  <circle cx="175" cy="155" r="4" fill="white" opacity="0.6"/>
  <circle cx="420" cy="155" r="3" fill="white" opacity="0.5"/>
  <circle cx="190" cy="330" r="3" fill="white" opacity="0.45"/>
  <circle cx="410" cy="328" r="4" fill="white" opacity="0.55"/>
  <circle cx="160" cy="240" r="2.5" fill="white" opacity="0.4"/>
  <circle cx="440" cy="250" r="2.5" fill="white" opacity="0.4"/>
</svg>`;

  writeFileSync(join(outDir, `${p.name}.jpg`), svg, 'utf8');
  console.log(`✓ Created ${p.name}.jpg`);
}

console.log('\n✅ All placeholder images created in /public/images/');
console.log('👉 Replace these with real photos by dropping JPG/PNG files with the same names.');
