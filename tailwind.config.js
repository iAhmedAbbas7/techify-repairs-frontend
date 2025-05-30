/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          DB: "#2c3a56",
          LB1: "#57b3fe",
          LB2: "#70bfff",
          Y: "#f7cc3f",
          Y2: "#f5cf87",
          G1: "#005e5e",
          G2: "#2db181",
          R: "#fa3c48",
          R2 : "#c75c5c",
          S: "#ffaa83",
          GR: "#4c5c75",
          LG: "#e4eaf8",
        },
      },
      screens: {},
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({});
      addUtilities({});
    }),
  ],
};
