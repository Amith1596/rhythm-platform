/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D1F73",
          50: "#E8E9F7",
          100: "#D1D3EF",
          200: "#A3A7DF",
          300: "#757BCF",
          400: "#474FBF",
          500: "#1D1F73",
          600: "#17195C",
          700: "#111345",
          800: "#0B0C2E",
          900: "#050617"
        },
        secondary: {
          DEFAULT: "#3BA3A3",
          50: "#EBF6F6",
          100: "#D7EDED",
          200: "#AFDBDB",
          300: "#87C9C9",
          400: "#5FB6B6",
          500: "#3BA3A3",
          600: "#2F8282",
          700: "#236262",
          800: "#174141",
          900: "#0C2121"
        },
        accent: {
          DEFAULT: "#F4B4B4",
          50: "#FEFBFB",
          100: "#FDF7F7",
          200: "#FBEFEF",
          300: "#F9E7E7",
          400: "#F7CFCF",
          500: "#F4B4B4",
          600: "#EC7E7E",
          700: "#E44848",
          800: "#C42424",
          900: "#8E1A1A"
        },
        background: {
          DEFAULT: "#F0F4F8",
          light: "#F5EEF8",
          gradient: "linear-gradient(135deg, #F0F4F8 0%, #E8F0F7 50%, #F5EEF8 100%)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
