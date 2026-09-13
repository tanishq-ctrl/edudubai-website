import type { Config } from "tailwindcss"

/**
 * Every colour below resolves to a `R G B` triplet variable defined in
 * globals.css, wrapped so Tailwind can inject an alpha channel. Never put a
 * hex literal in here -- it silently breaks the `/opacity` modifier.
 */
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--gutter)",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        ink: {
          975: channel("--ink-975"),
          950: channel("--ink-950"),
          900: channel("--ink-900"),
          800: channel("--ink-800"),
          700: channel("--ink-700"),
          DEFAULT: channel("--ink-900"),
        },
        /* The brand anchor. crimson-600 is the primary: buttons, rules,
           accent text. Reads on paper (8.4:1) and as a ground under paper. */
        crimson: {
          /* Contextual: crimson on paper, gold on a dark ground. */
          ink: channel("--accent-ink"),
          900: channel("--crimson-900"),
          800: channel("--crimson-800"),
          700: channel("--crimson-700"),
          600: channel("--crimson-600"),
          500: channel("--crimson-500"),
          400: channel("--crimson-400"),
          300: channel("--crimson-300"),
          200: channel("--crimson-200"),
          100: channel("--crimson-100"),
          50: channel("--crimson-50"),
          DEFAULT: channel("--crimson-600"),
        },
        /* SIGNAL ONLY: live, open, new. Never decorative, never a band. */
        amber: {
          600: channel("--amber-600"),
          500: channel("--amber-500"),
          400: channel("--amber-400"),
          300: channel("--amber-300"),
          200: channel("--amber-200"),
          100: channel("--amber-100"),
          DEFAULT: channel("--amber-500"),
        },
        /* LEGACY NAME, warm neutral values. There is no navy in this palette;
           see globals.css. Prefer ink-* / crimson-* in new work. */
        navy: {
          900: channel("--navy-900"),
          800: channel("--navy-800"),
          700: channel("--navy-700"),
          600: channel("--navy-600"),
          500: channel("--navy-500"),
          400: channel("--navy-400"),
          300: channel("--navy-300"),
          200: channel("--navy-200"),
          100: channel("--navy-100"),
          50: channel("--navy-50"),
          DEFAULT: channel("--navy-700"),
        },
        gold: {
          /* Contextual: resolve to a legible step for the current surface.
             `ink` = gold text, `mark` = gold icons. See globals.css. */
          ink: channel("--gold-ink"),
          mark: channel("--gold-mark"),
          700: channel("--gold-700"),
          600: channel("--gold-600"),
          500: channel("--gold-500"),
          400: channel("--gold-400"),
          300: channel("--gold-300"),
          200: channel("--gold-200"),
          100: channel("--gold-100"),
          50: channel("--gold-50"),
          DEFAULT: channel("--gold-400"),
        },

        surface: {
          DEFAULT: channel("--surface"),
          raised: channel("--surface-raised"),
          sunken: channel("--surface-sunken"),
          inverse: channel("--surface-inverse"),
        },
        content: {
          strong: channel("--text-strong"),
          DEFAULT: channel("--text"),
          muted: channel("--text-muted"),
          subtle: channel("--text-subtle"),
          "on-dark": channel("--text-on-dark"),
          "on-dark-muted": channel("--text-on-dark-muted"),
        },
        line: {
          DEFAULT: channel("--line"),
          strong: channel("--line-strong"),
        },

        success: channel("--success"),
        warning: channel("--warning"),
        danger: channel("--danger"),
        info: channel("--info"),

        /* Legacy aliases: existing markup keeps rendering while routes are
           migrated. Remove once no `brand-*` / `neutral-*` class remains. */
        "brand-navy": {
          DEFAULT: channel("--brand-navy"),
          light: channel("--brand-navy-light"),
          dark: channel("--brand-navy-dark"),
        },
        "brand-gold": {
          DEFAULT: channel("--brand-gold"),
          light: channel("--brand-gold-light"),
          dark: channel("--brand-gold-dark"),
        },
        "neutral-bg": channel("--neutral-bg"),
        "neutral-bg-subtle": channel("--neutral-bg-subtle"),
        "neutral-text": channel("--neutral-text"),
        "neutral-text-muted": channel("--neutral-text-muted"),
        "neutral-border": channel("--neutral-border"),

        /* shadcn/ui bridge */
        border: channel("--border"),
        input: channel("--input"),
        ring: channel("--ring"),
        background: channel("--background"),
        foreground: channel("--foreground"),
        primary: {
          DEFAULT: channel("--primary"),
          foreground: channel("--primary-foreground"),
        },
        secondary: {
          DEFAULT: channel("--secondary"),
          foreground: channel("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: channel("--destructive"),
          foreground: channel("--destructive-foreground"),
        },
        muted: {
          DEFAULT: channel("--muted"),
          foreground: channel("--muted-foreground"),
        },
        accent: {
          DEFAULT: channel("--accent"),
          foreground: channel("--accent-foreground"),
        },
        popover: {
          DEFAULT: channel("--popover"),
          foreground: channel("--popover-foreground"),
        },
        card: {
          DEFAULT: channel("--card"),
          foreground: channel("--card-foreground"),
        },
      },

      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // `font-display` is Sora. It used to alias Inter, which left headings
        // with no more voice than body copy; that sameness was the main reason
        // the pages read flat. Falls back to the body stack if Sora fails.
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      /* Fluid scale. `text-display` through `text-2xs` replace the
         3xl/4xl/5xl/6xl/7xl free-for-all. */
      fontSize: {
        "2xs": ["var(--step--2)", { lineHeight: "1.5" }],
        xs: ["var(--step--1)", { lineHeight: "1.5" }],
        sm: ["var(--step--1)", { lineHeight: "1.6" }],
        base: ["var(--step-0)", { lineHeight: "1.65" }],
        lg: ["var(--step-1)", { lineHeight: "1.55" }],
        xl: ["var(--step-2)", { lineHeight: "1.4" }],
        "2xl": ["var(--step-3)", { lineHeight: "1.25" }],
        "3xl": ["var(--step-4)", { lineHeight: "1.15" }],
        "4xl": ["var(--step-5)", { lineHeight: "1.08" }],
        "5xl": ["var(--step-6)", { lineHeight: "1.04" }],
        "6xl": ["var(--step-7)", { lineHeight: "1.0" }],
        "7xl": ["var(--step-8)", { lineHeight: "0.96" }],
        display: ["var(--step-7)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["var(--step-8)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      },

      spacing: {
        /* Button heights between Tailwind's 12 and 16 steps. */
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        "section-xs": "var(--section-xs)",
        "section-sm": "var(--section-sm)",
        "section-md": "var(--section-md)",
        "section-lg": "var(--section-lg)",
        gutter: "var(--gutter)",
        header: "var(--header-h)",
      },

      maxWidth: {
        measure: "var(--measure)",
        "measure-sm": "52ch",
        "measure-xs": "38ch",
      },

      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        /* Tailwind's own 3xl (1.5rem) is overridden too: leftover
           `rounded-3xl` markup must not reintroduce the pill-card look. */
        "3xl": "var(--radius-2xl)",
      },

      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        gold: "var(--shadow-gold)",
      },

      /*
         Tailwind's default opacity scale steps in 5s, so a modifier like
         `bg-white/12` or `bg-danger/8` generates NOTHING and fails silently —
         the element renders with no background at all. That had quietly
         removed 33 backgrounds, rings and borders across the site (error
         panels, icon chips, badge fills, the glass panel's edge).

         A 0-100 step-of-1 scale makes every value valid. JIT only emits the
         ones actually used, so this costs nothing in the output.
      */
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),

      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "out-quint": "var(--ease-out-quint)",
        "in-out-smooth": "var(--ease-in-out)",
        spring: "var(--ease-spring)",
      },

      transitionDuration: {
        fast: "var(--dur-fast)",
        DEFAULT: "var(--dur)",
        slow: "var(--dur-slow)",
        reveal: "var(--dur-reveal)",
      },

      backgroundImage: {
        /* No section-ground gradients. `ink-fade` was removed: dark bands are
           a flat field (bg-ink-950 / bg-ink-975), which is what keeps the
           page reading as printed matter rather than as a render. */
        "gold-line": "linear-gradient(90deg, rgb(var(--gold-400) / 0), rgb(var(--gold-400)), rgb(var(--gold-400) / 0))",
        /* A ruled grid, not a glow. Warm hairlines over a dark field. */
        "grid-navy":
          "linear-gradient(rgb(var(--navy-300) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--navy-300) / 0.06) 1px, transparent 1px)",
      },

      backgroundSize: {
        grid: "64px 64px",
        "grid-sm": "32px 32px",
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
      },

      animation: {
        "accordion-down": "accordion-down var(--dur) var(--ease-out-expo)",
        "accordion-up": "accordion-up var(--dur) var(--ease-out-expo)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
