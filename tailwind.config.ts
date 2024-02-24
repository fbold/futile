import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // PURPLE
      colors: {
        pri: "#403532",
        sec: "#292321",
        text: "#FFFFEB",
        accent: "#D48B72",
        action: "#D4A373",
      },
      // colors: {
      //   // light mode
      //   'pri': '#FFFFEB',    // lighter - 60%
      //   'sec': '#FAEDCD',    // darker  - 30%
      //   'acc': '#D4A373',    // accent  - 10%
      //   'txt-pri': '#281515',
      //   'txt-sec': '#FFFFEB',
      //   // dark mode
      //   'pri-d': '#403532',  // lighter - 60%
      //   'sec-d': '#292321',  // darker  - 30%
      //   'acc-d': '#D48B72',  // accent  - 10%
      //   'txt-pri-d': '#FFFFEB',
      //   'txt-sec-d': '#281515',
      // },
      blur: {
        "2xs": "2px",
        xs: "4px",
        sm: "8px",
      },
      //GREEN
      // colors: {
      //   pri: "#FFFFFF",
      //   sec: "#309362",
      //   text: "#0d1216",
      //   accent: "#BF4E30",
      //   action: "#1BA361",
      // },
      fontFamily: {
        josefin: ["var(--font-josefin)"],
        "work-sans": ["var(--font-work-sans)"],
      },
    },
  },
  plugins: [],
}
export default config
