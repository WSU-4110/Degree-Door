/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Inter": ["Inter", "sans-serif"],
      "Mogra": ["Mogra", "cursive"]
    },
    extend: {
      boxShadow: {
        'DEFAULT': '0 0 25px rgba(0, 0, 0, 0.2)',
      },
      backgroundColor: {
        'whitesmoke': '#f5f5f5',
      }
    },
  },
  plugins: [],
}
