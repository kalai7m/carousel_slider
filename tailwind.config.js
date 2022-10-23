/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "892px",
      xl: "1024px",
      "2xl": "1200px",
      "3xl": "1300px",
      "4xl": "1440px",
      "5xl": "1532px",
    },
    extend: {
      backgroundOpacity: ["active"],
      colors: {
        darkBlack: "#081219",
        grassGreen: {
          100: "#1CC98A",
          200: "#0F855B",
          300: "#2BDA80",
          400: "#058F5D",
        },
      },
      backgroundImage: {
        profile: "url('/src/assets/profile.png')",
      },
    },
  },
  plugins: [],
};
