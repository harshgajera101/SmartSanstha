// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
//   // server: { port: 5173 },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- ADD THIS LINE

export default defineConfig({
  plugins: [
    tailwindcss(), // <-- ADD THIS PLUGIN CALL
    react(), 
  ],
  build: {
    outDir: 'build',
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     outDir: 'build',
//   },
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import { fileURLToPath, URL } from 'node:url'; // Import Node.js URL helpers

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react(), 
//   ],
//   resolve: {
//     alias: {
//       // Set alias '@' to point to the 'src' directory
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
//   build: {
//     // Set the output directory for the build to 'build'
//     outDir: 'build',
//   },
// });
