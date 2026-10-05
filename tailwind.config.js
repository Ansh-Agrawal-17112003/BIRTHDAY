/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dreamy: {
          dark: '#0a0512',
          purple: '#1a0b2e',
          lavender: '#d8b4fe',
          pink: '#f472b6',
          rose: '#fb7185',
          peach: '#fed7aa',
          gold: '#fbbf24',
          cream: '#fdfbf7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        hand: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'candle-flicker': 'candleFlicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        candleFlicker: {
          '0%': { transform: 'scale(1) skewX(0deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.08, 0.95) skewX(2deg)', opacity: '1' },
          '50%': { transform: 'scale(0.95, 1.05) skewX(-2deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.05, 1.02) skewX(1deg)', opacity: '1' },
          '100%': { transform: 'scale(1) skewX(0deg)', opacity: '0.95' },
        }
      },
      boxShadow: {
        'glow-pink': '0 0 35px -5px rgba(244, 114, 182, 0.5)',
        'glow-gold': '0 0 35px -5px rgba(251, 191, 36, 0.5)',
        'glow-lavender': '0 0 35px -5px rgba(216, 180, 254, 0.4)',
        'glass': '0 8px 32px 0 rgba(17, 7, 34, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
