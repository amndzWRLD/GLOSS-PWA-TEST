/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gloss-yellow': '#d4ff00',
        'gloss-green': '#9cff00',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-border': '#2a2a2a'
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
