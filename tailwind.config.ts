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
    "translate-y-1/4",
    "-translate-y-1/4",
    "translate-x-1/4",
    "-translate-x-1/4",
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
        "gradient-smooth-linear-to-t":
          "linear-gradient(to top, rgba(13,11,11,1) 0%, rgba(13,11,11,1) 31%, rgba(13,11,11,0.8533614129245448) 65%, rgba(0,212,255,0) 100%)",
        "gradient-smooth-linear-to-b":
          "linear-gradient(to bottom, rgba(13,11,11,1) 0%, rgba(13,11,11,1) 31%, rgba(13,11,11,0.8533614129245448) 65%, rgba(0,212,255,0) 100%)",
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
