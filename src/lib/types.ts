export interface Color {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    locked: boolean;
  }
  
  export interface Palette {
    id: string;
    name: string;
    colors: Color[];
    description?: string;
    createdAt: Date;
  }
  
  export interface Evaluation {
    score: number;
    contrast: number;
    harmony: number;
    accessibility: number;
    balance: number;
    feedback: string;
  }
  
  export interface GenerateOptions {
    mode: 'description' | 'image' | 'random';
    input?: string;
    imageUrl?: string;
    colorCount?: number;
    lockedColors?: Color[];
  }
  