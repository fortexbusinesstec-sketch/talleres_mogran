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
          canvas: "#FCFCFC",
          surface: "#FFFFFF",
          elevated: "#F0F4F8",
          inset: "#E8ECF2",
          text: "#05113A",
          "text-secondary": "#5A6578",
          "text-muted": "#8A95A8",
          "text-inverse": "#FCFCFC",
          primary: "#3D8B8B",
          "primary-hover": "#2D6E6E",
          "primary-subtle": "#E0F0F0",
          accent: "#5A8F6E",
          "accent-subtle": "#E8F2EC",
          success: "#7BAE7F",
          "success-subtle": "#EDF5EE",
          warning: "#C87E5A",
          "warning-subtle": "#F5E8E0",
          danger: "#B85C5C",
          "danger-subtle": "#F5E0E0",
          info: "#5A8FA8",
          "info-subtle": "#E0EAF0",
          border: "#D1D8E0",
          "border-focus": "#3D8B8B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
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