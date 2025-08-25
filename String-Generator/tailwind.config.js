/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { inter: ["Inter","ui-sans-serif","system-ui"] },
      boxShadow: { glass: "0 10px 30px rgba(2,6,23,.12)" },
    },
  },
  plugins: [],
};
