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
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5ad',
          300: '#f8b577',
          400: '#f49340',
          500: '#D97635',
          600: '#D97635',
          700: '#b86028',
          800: '#934b1f',
          900: '#7a3f1b',
        },
        secondary: {
          50: '#f0f3f7',
          100: '#d8e0ec',
          200: '#b3c2d6',
          300: '#859eb8',
          400: '#5a7a9a',
          500: '#1F3A56',
          600: '#1F3A56',
          700: '#1a3149',
          800: '#14273b',
          900: '#0f1c2d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
