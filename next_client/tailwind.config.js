/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        // "main": '#000000'
      },
      colors: {
        'dark-blue': '#203a54',
        "dark-red":"#db2525"
      },
      keyframes: {
        'bottom-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(100%)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        bottomUp:'bottom-up 0.1s ease-in forwards'
      }
    },
  },
  plugins: [],
}