import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react')) return 'react-core';
            return 'vendor';
          }
        }
      }
    }
  },
  plugins: [
    tailwindcss(), 
    react(),
    {
      name: 'enforce-size-budget',
      enforce: 'post',
      generateBundle(_, bundle) {
        let failed = false;
        for (const [fileName, output] of Object.entries(bundle)) {
          if (output.type === 'chunk') {
            const size = output.code.length / 1024;
            if (size > 250) {
              console.error(`[Size Budget] Chunk exceeded limit: ${fileName} is ${size.toFixed(2)} KB (limit: 250 KB)`);
              failed = true;
            }
          }
        }
        if (failed) throw new Error('Build failed: Size budget exceeded!');
      }
    }
  ],
});
