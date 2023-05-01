module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Starjedi: ["Starjedi"],
        Varino: ["Varino"],
        HanSolo: ["HanSolo"],
        Typewriter: ["Typewriter"],
        Ananda: ["Ananda"]
      },
      opacity: {
        85: ".85",
      },
      letterSpacing: {
        wide: ".025em",
        wider: ".05em",
        widest: ".10em",
      },
      backgroundImage: {
        'star-sky': "url('/src/app/assets/images/general/001.jpg')",
        'auth': "url('./src/app/assets/images/general/011.jpg')",
        'validate-email': "url('./src/app/assets/images/general/002.jpg')",
      },
      colors: {
        // saumon
        primary: {
          light: "#f4d3cd",
          DEFAULT: "#e2a99f",
          dark: "#e48d7e",
        },
        // gris
        secondary: {
          light: "#d6d6d6",
          DEFAULT: "#aaaaaa",
          dark: "#777777",
        },
        // vert
        terciary: {
          light: "#cbffe6",
          DEFAULT: "#8fecbf",
          dark: "#7ac7a2",
        },
        // jaune
        quaternary: {
          light: "#fcfcc0",
          DEFAULT: "#f6f591",
          dark: "#d3d25f",
        },
        // noir
        black: {
          light: "#262626",
          DEFAULT: "#11031D",
          dark: "#000000",
        },
        purple: {
          light: "#E9D5FF",
          DEFAULT: "#C194DA",
          dark: "#6B21A8",
        },
        orange:{
          DEFAULT: "#F4AE09"
        }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
