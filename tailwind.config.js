/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D21",
        secondary: "#1B1B36",
        gray_: "#C2C2C2",
        border: "#2A2A4D",
        wallet: "#FFA800",
      },
      fontFamily: {
        play: ["Play", "Poppins", "sans-serif"],
        astrolab: ["Astrolab", "sans-serif"],
        a4speed: ["A4Speed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
