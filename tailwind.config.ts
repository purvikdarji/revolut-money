import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F1F8F4",
          100: "#DFEEE7",
          400: "#34C27A",
          500: "#0E9A55",
          600: "#00773E",
          700: "#005F31",
          900: "#032B1A",
        },
        gold: {
          300: "#E6CC8A",
          500: "#C9A24B",
        },
        ink: {
          400: "#6E8578",
          600: "#3F5A4C",
          900: "#0A1F16",
        },
        line: "#DCE8E1",
        mist: "#F6FAF7",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        gu: ["Noto Sans Gujarati", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "28px",
        input: "16px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 24px 60px -24px rgba(0,119,62,.35)",
        glow: "0 0 40px rgba(52,194,122,.25)",
        md: "0 8px 24px rgba(10,31,22,.12)",
        sm: "0 2px 8px rgba(10,31,22,.08)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse at 20% 60%, #005F31 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, #0E9A55 0%, transparent 45%)",
        "cta-gradient": "linear-gradient(135deg, #00773E 0%, #0E9A55 100%)",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(.4,0,.6,1) infinite",
      },
      fontSize: {
        xs: ["13px", { lineHeight: "1.4" }],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
