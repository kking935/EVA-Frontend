/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // ...
    extend: {
      transitionProperty: {
        'translate-x': 'transform',
      },
      transitionDuration: {
        '500': '500ms',
      },
      translate: {
        'full': '100%',
      },
    },
  },
  plugins: [],
}