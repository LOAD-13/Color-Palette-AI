import type { Color } from '../lib/types';
import { hexToRgb, rgbToHsl } from '../lib/colorUtils';

export function generateExportFormats(colors: Color[]) {
  const hexColors = colors.map(c => c.hex);
  
  return {
    hex: hexColors.join(', '),
    rgb: colors.map(c => `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`).join('\n'),
    hsl: colors.map(c => `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`).join('\n'),
    css: colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n'),
    tailwind: `colors: {\n${colors.map((c, i) => `  'primary-${i + 1}': '${c.hex}',`).join('\n')}\n}`,
    json: JSON.stringify({ palette: colors.map((c, i) => ({ 
      name: `color-${i + 1}`,
      hex: c.hex,
      rgb: c.rgb,
      hsl: c.hsl
    }))}, null, 2),
  };
}

export function displayExportFormats(colors: Color[]) {
  const formats = generateExportFormats(colors);
  
  document.getElementById('export-hex')!.textContent = formats.hex;
  document.getElementById('export-rgb')!.textContent = formats.rgb;
  document.getElementById('export-hsl')!.textContent = formats.hsl;
  document.getElementById('export-css')!.textContent = formats.css;
  document.getElementById('export-tailwind')!.textContent = formats.tailwind;
  document.getElementById('export-json')!.textContent = formats.json;

  const panel = document.getElementById('export-panel');
  panel?.classList.remove('hidden');
  panel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
