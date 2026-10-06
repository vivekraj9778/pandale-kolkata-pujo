/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          // Deep Luxury Midnight Indigo/Obsidian
          bg: '#0a0d16',
          surface: '#111726',
          surfaceHover: '#172033',
          border: '#1f2a44',
          borderHover: '#33446b',
          // Royal Festive Accents
          primary: '#e11d48', // Royal Rose Crimson
          primaryHover: '#be123c',
          gold: '#f59e0b', // Imperial Gold
          amber: '#fbbf24',
          marigold: '#ff7849', // Bengal Marigold
          emerald: '#059669', // Sacred Basil / Green
          metroBlue: '#2563eb', // Modern Transit Sapphire
          violet: '#7c3aed',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(225, 29, 72, 0.4)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
        'glow-sapphire': '0 0 25px rgba(37, 99, 235, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
