import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3fffb",
          100: "#ecfdf8",
          200: "#dffbf2",
          300: "#bcf1df",
          400: "#7de3c1",
          500: "#3ed8a4",
          600: "#00cc87",
          700: "#00a36d",
          800: "#007a52",
          900: "#005236",
        },
        secondary: {
          50: "#f5f7f9",
          100: "#e6f1f5",
          200: "#c7dfe8",
          300: "#96c5d6",
          400: "#5fa5be",
          500: "#4588a1",
          600: "#326578",
          700: "#264f5e",
          800: "#1f404c",
          900: "#1f343e",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
