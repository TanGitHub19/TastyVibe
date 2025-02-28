/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        inter: ['"Inter"', "sans-serif"],
      },
      backgroundImage: {
        "bg-1": "url('foodBg.jpg')",
        "bg-2": "url('food.jpg')",
        "bg-3": "url('music-2.jpg')",
        "bg-4": "url('music-3.jpg')",
        "bg-5": "url('dr.jpg')",
      },
      keyframes: {
        colorChange: {
          "0%": { color: "#ffffff" },
          "50%": { color: "#00ff00" },
          "100%": { color: "#ffffff" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        colorChange: "colorChange 3s ease-in-out infinite",
        beat: "beat 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
