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
        full: "0 0 5px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "repeated-pattern": "url('/images/right_image.svg')", // Substitua pelo caminho da sua imagem
      },
    },
  },
  plugins: [],
}
