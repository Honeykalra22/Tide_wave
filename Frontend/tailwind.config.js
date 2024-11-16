/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'xl': '2px 2px 8px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // Use a plugin for text shadows
  ],
}

