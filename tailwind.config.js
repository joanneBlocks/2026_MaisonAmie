/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPink: "#d1898f",
        lightPink: "#fad3d7",
        pureBlack: "#000000",
        pureWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
