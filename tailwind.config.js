/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        handwriting: ['"Dancing Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Big Shoulders Display"', '"Be Vietnam Pro"', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: '#FCBC5B',
        'gold-ink': '#8A5A12',
        cream: '#FFEEDF',
        'cream-soft': '#D6CDBD',
        plum: '#140B29',
        'plum-deep': '#0B0719',
        rose: '#FF7EB6',
        cyan: '#7FE7FF',
        paper: '#FFF3DF',
        ink: '#231430',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}
