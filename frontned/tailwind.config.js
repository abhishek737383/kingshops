// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // e.g. require("@tailwindcss/forms"),
    //      require("@tailwindcss/typography"),
  ],
};
