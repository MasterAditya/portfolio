import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Vercel serves at root, while GitHub Pages serves this project under /portfolio/.
  const isVercel = process.env.VERCEL === '1';

  return {
    base: isVercel ? '/' : '/portfolio/',
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
