/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-900': '#1e3a8a',
        'blue-950': '#172554',
        'green-custom': '#16a34a',
        'red-custom': '#dc2626',
      },
    },
  },
  plugins: [ // Enable prose class for blog content
  ],
};

module.exports = config;
