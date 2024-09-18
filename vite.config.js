import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'slick-carousel': '/node_modules/slick-carousel'
    }
  }
});