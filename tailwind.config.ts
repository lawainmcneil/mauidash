import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f5f7f4",
        panel: "#fbfcfa",
        ink: "#102217",
        muted: "#5c6e61",
        line: "#d7ddd6",
        accent: "#1f6b4f",
        accentSoft: "#dff2e7",
        warn: "#a35a00",
        warnSoft: "#fbeed9",
        danger: "#8a2f2f",
        dangerSoft: "#f8e0df",
      },
      boxShadow: {
        panel: "0 12px 32px rgba(16, 34, 23, 0.06)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
