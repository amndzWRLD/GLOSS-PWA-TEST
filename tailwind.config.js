/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        "gloss-yellow": "#d4ff00",
        "gloss-green": "#9cff00",
        "gloss-lightBg": "#f7f7f2",
        "gloss-lightCard": "#ffffff",
        "gloss-lightBorder": "#e5e7eb",
        "gloss-darkBg": "#0a0a0a",
        "gloss-darkCard": "#131313",
        "gloss-darkBorder": "#2a2a2a",
        "dark-bg": "#0a0a0a",
        "dark-card": "#1a1a1a",
        "dark-border": "#2a2a2a",
      },

      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },

  plugins: [],
};