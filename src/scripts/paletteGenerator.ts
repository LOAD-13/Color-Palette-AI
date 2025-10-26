import { generatePaletteFromDescription, improvePalette } from '../lib/gemini';
import { extractColorsFromImage } from '../lib/imageProcessor';
import { createColor, generateRandomColor } from '../lib/colorUtils';
import type { Color } from '../lib/types';

export class PaletteManager {
  private colors: Color[] = [];
  private listeners: Array<(colors: Color[]) => void> = [];

  constructor(initialColors?: string[]) {
    if (initialColors) {
      this.colors = initialColors.map(hex => createColor(hex));
    } else {
      this.generateRandom();
    }
  }

  getColors(): Color[] {
    return this.colors;
  }

  setColors(colors: Color[]) {
    this.colors = colors;
    this.notifyListeners();
  }

  updateColor(index: number, hex: string) {
    if (this.colors[index]) {
      this.colors[index] = createColor(hex, this.colors[index].locked);
      this.notifyListeners();
    }
  }

  toggleLock(index: number) {
    if (this.colors[index]) {
      this.colors[index].locked = !this.colors[index].locked;
      this.notifyListeners();
    }
  }

  async generateRandom() {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    
    // Mantener colores bloqueados
    this.colors.forEach((color, index) => {
      if (color.locked) {
        newColors[index] = color;
      }
    });

    this.colors = newColors;
    this.notifyListeners();
  }

  async generateFromDescription(description: string) {
    try {
      const hexColors = await generatePaletteFromDescription(description, 5);
      const newColors = hexColors.map(hex => createColor(hex));

      // Mantener colores bloqueados
      this.colors.forEach((color, index) => {
        if (color.locked) {
          newColors[index] = color;
        }
      });

      this.colors = newColors;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error generating from description:', error);
      return false;
    }
  }

  async generateFromImage(imageUrl: string) {
    try {
      const hexColors = await extractColorsFromImage(imageUrl, 5);
      const newColors = hexColors.map(hex => createColor(hex));

      // Mantener colores bloqueados
      this.colors.forEach((color, index) => {
        if (color.locked) {
          newColors[index] = color;
        }
      });

      this.colors = newColors;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error extracting colors from image:', error);
      return false;
    }
  }

  async improve() {
    try {
      const currentHexColors = this.colors.map(c => c.hex);
      const improvedHexColors = await improvePalette(currentHexColors);
      const newColors = improvedHexColors.map(hex => createColor(hex));

      // Mantener colores bloqueados
      this.colors.forEach((color, index) => {
        if (color.locked) {
          newColors[index] = color;
        }
      });

      this.colors = newColors;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error improving palette:', error);
      return false;
    }
  }

  subscribe(listener: (colors: Color[]) => void) {
    this.listeners.push(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.colors));
  }
}
