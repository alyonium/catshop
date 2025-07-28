import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/catshop/',
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      modules: path.resolve(__dirname, 'src/modules'),
      types: path.resolve(__dirname, 'src/types'),
      store: path.resolve(__dirname, 'src/store'),
    },
  },
});
