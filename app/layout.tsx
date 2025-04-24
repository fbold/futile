import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"

// const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })
// const josefin = Josefin_Sans({
//   subsets: ["latin"],
//   variable: "--font-josefin",
//   display: "swap",
// })
// const workSans = Work_Sans({
//   subsets: ["latin"],
//   variable: "--font-work-sans",
//   preload: true,
//   fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
// })

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  preload: true,
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "futile.me",
  description:
    "the home of many flavours of futile endeavours in the written medium",
  openGraph: {
    title: "futile.me",
    description:
      "the home of many flavours of futile endeavours in the written medium",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={openSans.className}
    >
      <body className={"bg-sec h-[100dvh] block scroller"}>
        {children}
      </body>
    </html>
  )
}
