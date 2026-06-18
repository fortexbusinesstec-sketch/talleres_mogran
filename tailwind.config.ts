import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mogran: {
          primary: "#F81443",
          "primary-hover": "#D6103A",
          "primary-subtle": "#FEE5EA",
          secondary: "#14213D",
          tertiary: "#FCF2D1",
          neutral: "#2D3436",
          white: "#FFFFFF",
          border: "#E8E0D0",
        },
      },
      fontFamily: {
        sans: ["Fredoka", "system-ui", "sans-serif"],
        heading: ["Fredoka", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
    },
  },
  plugins: [],
};

export default config;
