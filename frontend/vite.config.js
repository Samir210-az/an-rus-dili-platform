import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/an-rus-dili-platform/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
