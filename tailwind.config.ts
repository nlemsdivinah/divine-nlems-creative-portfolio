import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        ink: "#15140F",
        cobalt: {
          DEFAULT: "#2C4A7E",
          light: "#4A6FA8",
          dark: "#1B3057",
        },
        ochre: {
          DEFAULT: "#C89B3C",
          light: "#DCB65F",
        },
        line: "#DAD5C7",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1400px",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
