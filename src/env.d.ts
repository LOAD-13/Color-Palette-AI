/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_GEMINI_API_KEY: string;
    // Agrega aquí cualquier otra variable de entorno que uses
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  