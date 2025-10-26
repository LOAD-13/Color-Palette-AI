export async function extractColorsFromImage(imageUrl: string, colorCount: number = 5): Promise<string[]> {
    // Crear un canvas temporal
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }
  
        // Reducir tamaño para procesamiento más rápido
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
  
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        // Muestreo de colores cada N píxeles
        const colorMap = new Map<string, number>();
        const step = 4; // Cada 4 píxeles
  
        for (let i = 0; i < pixels.length; i += step * 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
  
          // Ignorar píxeles transparentes y muy oscuros/claros
          if (a < 128) continue;
          if (r + g + b < 30 || r + g + b > 735) continue;
  
          const hex = rgbToHex(r, g, b);
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
  
        // Ordenar por frecuencia y tomar los más comunes
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .map(entry => entry[0]);
  
        // Filtrar colores similares
        const uniqueColors: string[] = [];
        for (const color of sortedColors) {
          if (uniqueColors.length >= colorCount) break;
          
          const isDifferent = uniqueColors.every(existing => {
            return colorDistance(color, existing) > 50;
          });
  
          if (isDifferent) {
            uniqueColors.push(color);
          }
        }
  
        // Rellenar con colores aleatorios si no hay suficientes
        while (uniqueColors.length < colorCount) {
          uniqueColors.push(generateRandomHex());
        }
  
        resolve(uniqueColors.slice(0, colorCount));
      };
  
      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = imageUrl;
    });
  }
  
  function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  
  function colorDistance(hex1: string, hex2: string): number {
    const r1 = parseInt(hex1.slice(1, 3), 16);
    const g1 = parseInt(hex1.slice(3, 5), 16);
    const b1 = parseInt(hex1.slice(5, 7), 16);
  
    const r2 = parseInt(hex2.slice(1, 3), 16);
    const g2 = parseInt(hex2.slice(3, 5), 16);
    const b2 = parseInt(hex2.slice(5, 7), 16);
  
    return Math.sqrt(
      Math.pow(r2 - r1, 2) +
      Math.pow(g2 - g1, 2) +
      Math.pow(b2 - b1, 2)
    );
  }
  
  function generateRandomHex(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
  