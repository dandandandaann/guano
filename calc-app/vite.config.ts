import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  base: '/calc-app/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calculadoras de Engenharia',
        short_name: 'CalcApp',
        description: 'Coleção de calculadoras de engenharia para uso em campo.',
        lang: 'pt-BR',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/calc-app/',
        scope: '/calc-app/',
        icons: [
          { src: '/calc-app/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/calc-app/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/calc-app/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ],
});
