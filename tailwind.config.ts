import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // There are here because they are dynamically added
    // So tailwind seems to purge them erroneously
    "-translate-x-1/2",
    "translate-x-1/2",
    "-translate-x-full",
    "translate-x-full",
    "-translate-y-1/2",
    "translate-y-1/2",
    "translate-y-full",
    "-translate-y-full",
    "rotate-90",
    "-rotate-90",
    "right-1/2",
    "-right-1/2",
    "left-1/2",
    "-left-1/2",
    "right-3",
    "right-0",
    "left-3",
    "left-0",
    "top-0",
    "top-3",
    "bottom-0",
    "bottom-3",
    "origin-right",
    "origin-left",
    "bg-rd",
    "bg-yw",
    "bg-gn",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pri: "#221d1c",
        sec: "#0d0b0b",
        text: "#FFFFEB",
        dim: "#9ca3af",

        accent: "#D48B72",
        action: "#D4A373",
        danger: "#ef4444",
        success: "#22c55e",
        warn: "",
        rd: "#f87171",
        yw: "#fde047",
        gn: "#4adb7e",
      },
      blur: {
        "2xs": "2px",
        xs: "4px",
        sm: "8px",
      },
      fontFamily: {
        josefin: ["var(--font-josefin)"],
        "work-sans": ["var(--font-work-sans)"],
        "open-sans": ["var(--font-open-sans)"],
      },
    },
  },
  plugins: [],
}
export default config
