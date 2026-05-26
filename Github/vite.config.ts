import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(() => {
  const isSingleFile = process.env.VITE_SINGLE_FILE === 'true';

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      isSingleFile ? viteSingleFile() : null
    ].filter(Boolean),
    build: {
      assetsInlineLimit: isSingleFile ? 100000000 : 4096, // Inline all assets up to 100MB in single file mode
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
