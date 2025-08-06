/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#FFFFFF",
        secondary: "#AAAAAA",
        accent: "#8A2BE2",
        background: "#1a1a2e",
        "background-light": "#1f1f3a",
      },
    },
  },
  plugins: [],
}
