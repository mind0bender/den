/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        nonav: "calc(100vh - 85px)",
      },
      maxHeight: {
        nonav: "calc(100vh - 85px)",
      },
    },
  },
  plugins: [],
};
