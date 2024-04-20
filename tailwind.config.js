/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-primary": "var(--orange-primary-color)",
        "blue-primary": "var(--blue-primary-color)",
        "green-primary": "var(--green-primary-color)",
        "orange-sencondary": "var(--orange-secondary-color)",
        "green-sencondary": "var(--green-secondary-color)",
        "blue-sencondary": "var(--blue-secondary-color)",
      },
    },
  },
  plugins: [],
};
