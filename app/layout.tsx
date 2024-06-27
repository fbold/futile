import type { Metadata } from "next"
import { Josefin_Sans, Open_Sans, Work_Sans } from "next/font/google"
import "./globals.css"

// const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })
const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
})
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "futile.me",
  description: "the home of personal textual futility",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${josefin.variable} ${workSans.variable} ${openSans.variable}`}
    >
      <body className={" bg-pri h-screen block font-open-sans"}>
        {children}
      </body>
    </html>
  )
}
