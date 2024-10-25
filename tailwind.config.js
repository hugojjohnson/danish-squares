/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tickAnimation: {
          '0%': { transform: 'rotateY(90deg) translateY(10px)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg) translateY(-20px)', opacity: '1' },
        },
      },
      animation: {
        tickRotateFade: 'tickAnimation 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}