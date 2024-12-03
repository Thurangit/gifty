/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        'zoom-in-out': {
          '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.07)' },
        }
      }, animation: {
        'zoom-in-out': 'zoom-in-out 3s ease-in-out infinite', // Durée de 3 secondes avec un effet de zoom 
        'bounce-slow': 'bounce 3s infinite',
      },

    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}