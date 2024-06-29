/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          500: '#3b82f6', // Adjust this value as needed
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
      scale: ['hover'],
      backgroundColor: ['hover'], // Add this to allow hover effects for background color
      textColor: ['hover'], // Add this to allow hover effects for text color
    },
  },
  plugins: [],
}
