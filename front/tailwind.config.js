/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#F37671",
        "gray": "#A09F9F",
        "white": "#FFFFFF",
        "black": "#303030",
      },
      boxShadow: {
        full: "0 0 20px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
}
