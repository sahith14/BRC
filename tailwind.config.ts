import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./app/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#050507",
          800: "#0a0a0d",
          700: "#101015",
          600: "#1a1a22"
        },
        crimson: {
          600: "#b3001b",
          500: "#dc143c",
          400: "#ff2a4d",
          300: "#ff5772"
        },
        movement: {
          pink: "#ff1d6c",
          hot: "#ff3d80"
        },
        roach: {
          900: "#2b1a0d",
          800: "#3a2412",
          700: "#5b3a1f",
          600: "#7a4f2a"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.92" },
          "50%": { opacity: "0.6" },
          "55%": { opacity: "0.95" }
        },
        smoke: {
          "0%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.4" },
          "50%": { transform: "translate3d(20px,-30px,0) scale(1.15)", opacity: "0.6" },
          "100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.4" }
        },
        crawl: {
          "0%": { transform: "translateX(-30%) rotate(-2deg)" },
          "100%": { transform: "translateX(130%) rotate(2deg)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220,20,60,0.6)" },
          "50%": { boxShadow: "0 0 60px 8px rgba(220,20,60,0.35)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        flicker: "flicker 6s infinite",
        smoke: "smoke 14s ease-in-out infinite",
        crawl: "crawl 22s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite"
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "spotlight": "radial-gradient(circle at 50% 30%, rgba(220,20,60,0.25), transparent 60%)",
        "smoke-gradient": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%, #000 100%)"
      }
    }
  },
  plugins: []
};

export default config;
