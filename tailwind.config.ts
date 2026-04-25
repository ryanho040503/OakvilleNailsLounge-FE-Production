import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(162, 113, 89, 0.16)",
      },
      backgroundImage: {
        "soft-radial":
          "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(245,231,223,0.72), rgba(243,224,214,0.4))",
      },
    },
  },
  plugins: [animate],
};

export default config;
