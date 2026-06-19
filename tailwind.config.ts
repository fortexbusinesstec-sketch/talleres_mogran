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
          bone: "#F4F1E8",
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
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
