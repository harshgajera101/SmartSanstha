import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  // server: { port: 5173 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

// export const viteConfig = `import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),  tailwindcss()],
//   server: { port: 5173 }
// });`