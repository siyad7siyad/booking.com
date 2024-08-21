/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-out",
      },
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
  
};

