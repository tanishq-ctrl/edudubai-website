import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand colors from CSS variables
        "brand-navy": {
          DEFAULT: "rgb(var(--brand-navy) / <alpha-value>)",
          light: "rgb(var(--brand-navy-light) / <alpha-value>)",
          dark: "rgb(var(--brand-navy-dark) / <alpha-value>)",
        },
        "brand-gold": {
          DEFAULT: "rgb(var(--brand-gold) / <alpha-value>)",
          light: "rgb(var(--brand-gold-light) / <alpha-value>)",
          dark: "rgb(var(--brand-gold-dark) / <alpha-value>)",
        },
        // Neutral colors from CSS variables
        "neutral-bg": "rgb(var(--neutral-bg) / <alpha-value>)",
        "neutral-bg-subtle": "rgb(var(--neutral-bg-subtle) / <alpha-value>)",
        "neutral-text": "rgb(var(--neutral-text) / <alpha-value>)",
        "neutral-text-muted": "rgb(var(--neutral-text-muted) / <alpha-value>)",
        "neutral-border": "rgb(var(--neutral-border) / <alpha-value>)",
        // Legacy support
        navy: {
          DEFAULT: "#1e3a5f",
          light: "#2d4f7c",
          dark: "#0f1f35",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e5c158",
          dark: "#b8941f",
        },
        // shadcn/ui compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll": "scroll 90s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
