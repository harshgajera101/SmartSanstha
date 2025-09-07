/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          600: '#2563eb', // blue-600
          700: '#1d4ed8', // blue-700
          900: '#1e3a8a', // blue-900
        },
      },
      boxShadow: {
        soft: '0 2px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
