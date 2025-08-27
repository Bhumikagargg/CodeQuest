/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],  // UI text
        mono: ['Fira Code', 'monospace'], // Code blocks
      }
    },
  },
  plugins: [],
}

