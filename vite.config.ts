import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#components': path.resolve(__dirname, './src/components'),
      '#static': path.resolve(__dirname, './src/static'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#services': path.resolve(__dirname, './src/services'),
      '#utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
