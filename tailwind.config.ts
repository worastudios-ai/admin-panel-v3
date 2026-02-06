import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "manager-bg": "#050505",
        "alert-red": "#FF0033",
        "action-blue": "#2563EB",
        "glass-surface": "rgba(255,255,255,0.05)",
      },
      borderRadius: {
        squircle: "16px",
        "squircle-lg": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
