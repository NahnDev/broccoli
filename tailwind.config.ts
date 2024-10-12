import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
        "auto-1fr-auto": "auto 1fr auto",
        "1fr-auto-1fr": "1fr auto 1fr",
      },
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
        "auto-1fr-auto": "auto 1fr auto",
        "1fr-auto-1fr": "1fr auto 1fr",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
