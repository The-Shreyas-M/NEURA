import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030303",
        abyss: "#050505",
        cyber: "#00F0FF",
        matrix: "#00FF66",
        neural: "#7000FF",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "led-blink": "led-blink 1.6s steps(2, start) infinite",
        "scanline": "scanline 7s linear infinite",
        "marquee": "marquee 22s linear infinite",
        "grid-pan": "grid-pan 18s linear infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "led-blink": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.15" },
        },
        "scanline": {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100vh" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;