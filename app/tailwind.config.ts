import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../landing_clone/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "outline-variant": "#414755",
        "on-primary-fixed-variant": "#004493",
        "secondary-fixed": "#b7eaff",
        "on-primary": "#002e69",
        "tertiary-fixed-dim": "#ffb595",
        "surface": "#121820",
        "surface-dim": "#121820",
        "secondary": "#a6e6ff",
        "primary-fixed-dim": "#adc6ff",
        "on-background": "#e0e2ed",
        "outline": "#8b90a0",
        "on-surface": "#e0e2ed",
        "inverse-primary": "#005bc1",
        "on-secondary-fixed-variant": "#004e60",
        "on-tertiary-container": "#4c1a00",
        "tertiary-fixed": "#ffdbcc",
        "inverse-on-surface": "#2d3039",
        "error": "#ffb4ab",
        "secondary-container": "#14d1ff",
        "primary-fixed": "#d8e2ff",
        "on-tertiary-fixed-variant": "#7c2e00",
        "surface-container-high": "#1c2430",
        "primary": "#adc6ff",
        "on-primary-container": "#00285c",
        "surface-container-highest": "#222c3a",
        "on-secondary-fixed": "#001f28",
        "on-primary-fixed": "#001a41",
        "error-container": "#93000a",
        "surface-tint": "#adc6ff",
        "surface-container-low": "#141b24",
        "on-tertiary-fixed": "#351000",
        "on-error-container": "#ffdad6",
        "tertiary": "#ffb595",
        "inverse-surface": "#e0e2ed",
        "surface-bright": "#2a3442",
        "secondary-fixed-dim": "#4cd6ff",
        "on-surface-variant": "#c1c6d7",
        "on-secondary": "#003543",
        "surface-container": "#171e27",
        "on-secondary-container": "#00566b",
        "surface-container-lowest": "#0b1015",
        "on-tertiary": "#571e00",
        "background": "#0f141a",
        "primary-container": "#4b8eff",
        "tertiary-container": "#ef6719",
        "surface-variant": "#2b3441",
        "on-error": "#690005"
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
      spacing: {
        gutter: "16px",
        "container-max": "1440px",
        unit: "4px",
        margin: "24px"
      },
      fontFamily: {
        sora: ["Sora", "Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        jetbrains: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        "headline-lg-mobile": ["Sora", "Inter", "sans-serif"],
        "body-md": ["Inter", "system-ui", "sans-serif"],
        "label-mono": ["JetBrains Mono", "ui-monospace", "monospace"],
        "label-caps": ["Inter", "system-ui", "sans-serif"],
        "body-sm": ["Inter", "system-ui", "sans-serif"],
        "headline-xl": ["Sora", "Inter", "sans-serif"],
        "headline-lg": ["Sora", "Inter", "sans-serif"],
      },
      fontSize: {
        "headline-lg-mobile": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-mono": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        "label-caps": ["11px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-xl": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }]
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  plugins: [tailwindcssAnimate],
};

export default config;
