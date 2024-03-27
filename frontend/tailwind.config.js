/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      colors: {
        yellow: "#F2A81D",
        bg: "#D9D9D9",
      },
    },
    fontFamily: {
      heading: ["Marcellus"],
      sub: ["Josefin Slab"],
      primary: ["Montserrat"],
      secondary: ["Roboto Mono"],
      quotes: ["Whisper"],
      currency: ["BhuTuka Expanded One"],
    },
  },
  plugins: [require("daisyui")],
};
