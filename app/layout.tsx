import type { Metadata } from "next"
import { Josefin_Sans, Work_Sans } from "next/font/google"
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

export const metadata: Metadata = {
  title: "invyted.me",
  description: "Unique virtual invitations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${josefin.variable} ${workSans.variable}`}>
      <body className={" bg-pri h-screen block font-work-sans"}>
        {children}
      </body>
    </html>
  )
}
