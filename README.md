# 🎨 Color Palette AI

Generador y evaluador inteligente de paletas de colores con IA, desarrollado con Astro, Tailwind CSS y Gemini AI.

![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## ✨ Características

- 🤖 **Generación con IA**: Describe un mood o concepto y obtén paletas perfectas generadas por Gemini AI
- 🖼️ **Extracción desde Imágenes**: Sube una foto o URL y extrae automáticamente los colores dominantes
- 📊 **Evaluación Inteligente**: Califica tu paleta con análisis de contraste, armonía, accesibilidad y balance
- 🔒 **Bloqueo Selectivo**: Bloquea colores específicos y regenera solo los desbloqueados
- ⚡ **Mejora Automática**: Optimiza tu paleta con ajustes sutiles sin cambiarla completamente
- 📤 **Exportación Multi-formato**: HEX, RGB, HSL, CSS Variables, JSON y Tailwind Config
- 🎭 **Preview Interactivo**: Vista previa tipo Bento Grid con componentes UI aplicando tu paleta
- 🎨 **Edición Manual**: Click en cualquier color para editarlo con un color picker
- 🚀 **Ultra Rápido**: Construido con Astro para máximo rendimiento
- 📱 **Totalmente Responsive**: Diseño adaptable a cualquier dispositivo

## 🚀 Demo en Vivo

🔗 [Ver Demo](jloadenegri.org) *(próximamente)*

## 🛠️ Tecnologías

- **Framework**: [Astro](https://astro.build/) - Framework web moderno y ultra-rápido
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utility-first
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (modo estricto)
- **IA**: [Google Gemini AI](https://ai.google.dev/) - Modelo Gemini 1.5 Flash
- **Iconos**: [@lucide/astro](https://lucide.dev/) - Iconos hermosos y consistentes

## 📋 Requisitos Previos

- Node.js 18.x o superior
- pnpm (recomendado) o npm
- API Key de Google Gemini AI

## 🔧 Instalación

### 1. Clona el repositorio

git clone https://github.com/LOAD-13/Color-Palette-AI.git
cd Color-Palette-AI

text

### 2. Instala las dependencias

pnpm install

text

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

PUBLIC_GEMINI_API_KEY=tu_api_key_aqui

text

### 🔑 Cómo obtener tu API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Acepta los términos de servicio
4. Click en **"Create API Key"**
5. Selecciona un proyecto o crea uno nuevo
6. Copia la clave y pégala en tu archivo `.env`

⚠️ **Importante**: Nunca compartas tu API Key públicamente ni la subas a GitHub.

### 4. Inicia el servidor de desarrollo

pnpm dev

text

### 5. Abre tu navegador

Navega a `http://localhost:4321`

## 📁 Estructura del Proyecto

```bash
color-palette-ai/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── Demo.astro
│   │   │   ├── CTA.astro
│   │   │   └── Footer.astro
│   │   │
│   │   └── app/
│   │       ├── ColorCard.astro
│   │       ├── PaletteGrid.astro
│   │       ├── GeneratorPanel.astro
│   │       ├── EvaluationPanel.astro
│   │       ├── ExportPanel.astro
│   │       └── PreviewBento.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── AppLayout.astro
│   │
│   ├── lib/
│   │   ├── gemini.ts
│   │   ├── colorUtils.ts
│   │   ├── imageProcessor.ts
│   │   └── types.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   └── app/
│   │       └── index.astro
│   │
│   ├── scripts/
│   │   ├── paletteGenerator.ts
│   │   ├── paletteEvaluator.ts
│   │   └── exportHandler.ts
│   │
│   └── styles/
│       └── global.css
│
├── .env
├── .gitignore
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md


text

## 🎯 Uso

### 1. Generar Paleta desde Descripción

1. Navega a `/app`
2. En la pestaña "Descripción", escribe un mood o concepto
3. Ejemplos:
   - *"atardecer en la playa"*
   - *"cyberpunk futurista"*
   - *"bosque primaveral"*
   - *"café acogedor"*
4. Click en **"Generar"**
5. La IA creará una paleta armónica basada en tu descripción

### 2. Extraer Colores desde Imagen

1. Ve a la pestaña "Desde Imagen"
2. **Opción A**: Arrastra y suelta una imagen
3. **Opción B**: Pega una URL de imagen
4. Click en **"Extraer"**
5. Los colores dominantes se extraerán automáticamente

### 3. Generar Paleta Aleatoria

1. Click en **"Generar Aleatoria"**
2. Se generarán 5 colores aleatorios
3. Útil para inspiración rápida

### 4. Evaluar Paleta

1. Con una paleta generada, click en **"Evaluar Paleta"**
2. La IA analizará:
   - **Contraste**: Ratio WCAG AA/AAA
   - **Armonía**: Relaciones complementarias, análogas, triádicas
   - **Accesibilidad**: Legibilidad para daltonismo
   - **Balance**: Saturación, luminosidad y temperatura
3. Recibirás un score (0-100) y feedback detallado

### 5. Mejorar Paleta

1. Click en **"Arreglar con IA"**
2. La IA realizará ajustes sutiles sin cambiar radicalmente los colores
3. Mejorará contraste, armonía y balance automáticamente

### 6. Bloquear Colores

1. Click en el ícono de candado en cualquier color
2. Los colores bloqueados se mantendrán al regenerar
3. Solo se modificarán los colores desbloqueados
4. Ideal para mantener colores de marca

### 7. Editar Colores Manualmente

1. Click en cualquier tarjeta de color
2. Se abrirá un color picker
3. Selecciona el color deseado
4. El cambio se aplica instantáneamente

### 8. Exportar Paleta

1. Click en **"Exportar"**
2. Elige entre los formatos disponibles:
   - **HEX**: `#FF6B6B, #4ECDC4, ...`
   - **RGB**: `rgb(255, 107, 107), ...`
   - **HSL**: `hsl(0, 100%, 71%), ...`
   - **CSS Variables**: `--color-1: #FF6B6B;`
   - **Tailwind Config**: Para `tailwind.config.js`
   - **JSON**: Formato estructurado con RGB y HSL
3. Click en el ícono de copiar para llevar el código a tu clipboard

## 🏗️ Build para Producción

pnpm build

text

Los archivos optimizados se generarán en el directorio `dist/`.

### Preview del Build

pnpm preview

text

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si tienes ideas para mejorar el proyecto:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Astro](https://astro.build/) por el increíble framework
- [Google Gemini AI](https://ai.google.dev/) por la potencia de la IA
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Lucide](https://lucide.dev/) por los hermosos iconos

## 👨‍💻 Autor

**Joaquín Loa Denegri**

- GitHub: [@LOAD-13](https://github.com/LOAD-13)
- Proyecto: [Color Palette AI](https://github.com/LOAD-13/Color-Palette-AI)

---

⭐ Si te gustó este proyecto, considera darle una estrella en GitHub!