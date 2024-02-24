"use client"
import clsx from "clsx"
// import { useTheme } from 'next-themes'
import Link from "next/link"
import styles from "./MainLayout.module.css"
import { useEffect, useState } from "react"
import {
  IconHome,
  IconMenu2,
  IconMoon,
  IconPencil,
  IconStar,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import NextAuthProvider from "@/components/auth/next-auth-provider"

type Props = {
  children?: JSX.Element
}

export default function MainLayout({ children }: Props) {
  // const { theme, setTheme } = useTheme()

  // const ThemeIcon = theme === 'light' ? IconMoon : IconStar
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const asPath = pathname
  // const { } = useRouter()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <div className={clsx(styles.navigation)}>
        <button
          className={clsx(
            styles.contextButton,
            "bg-sec dark:bg-sec-d border border-acc dark:border-acc-d transition-colors duration-100",
            menuOpen && "border-sec dark:border-sec-d"
          )}
          onClick={() => setMenuOpen((c) => !c)}
        >
          <div
            className={clsx(
              styles.menuIcon,
              menuOpen && styles.open,
              "text-txt-pri dark:text-txt-pri-d"
            )}
          >
            <span className="bg-txt-pri dark:bg-txt-pri-d" />
            <span className="bg-txt-pri dark:bg-txt-pri-d" />
            <span className="bg-txt-pri dark:bg-txt-pri-d" />
            <span className="bg-txt-pri dark:bg-txt-pri-d" />
          </div>
        </button>
        <div
          className={clsx(
            styles.contextOrbit,
            menuOpen && styles.open,
            menuOpen ? "border-acc dark:border-acc-d border" : "border-0"
          )}
        >
          <div
            className={clsx(
              styles.menuButton,
              menuOpen && styles.open,
              asPath.includes("account") && styles.active,
              "bg-sec dark:bg-sec-d border-acc dark:border-acc-d"
            )}
          >
            <Link href="/account" title="Blog">
              <IconUser
                className="text-acc dark:text-acc-d"
                strokeWidth={1.5}
              />
              {/* <p>Blog</p> */}
            </Link>
          </div>
          <div
            className={clsx(
              styles.menuButton,
              menuOpen && styles.open,
              asPath === "/" && styles.active,
              "bg-sec dark:bg-sec-d border-acc dark:border-acc-d"
            )}
          >
            <Link href="/" title="Home">
              <IconHome
                className="text-acc dark:text-acc-d"
                strokeWidth={1.5}
              />
              {/* <p>Home</p> */}
            </Link>
          </div>
          <div
            className={clsx(
              styles.menuButton,
              menuOpen && styles.open,
              asPath.includes("about") && styles.active,
              "bg-sec dark:bg-sec-d border-acc dark:border-acc-d"
            )}
          >
            <Link href="/poems/create" title="Write">
              <IconPencil
                className="text-acc dark:text-acc-d"
                strokeWidth={1.5}
              />
              {/* <p>About</p> */}
            </Link>
          </div>
        </div>
      </div>
      <nav className="sticky flex p-2 bg-sec dark:bg-sec-d w-full h-12 z-50 bg-gradient-to-b">
        <button
          className="h-full w-8"
          // onClick={() => {
          //   setTheme(theme === 'light' ? 'dark' : 'light')
          // }}
        >
          <IconMenu2 className="h-full w-auto stroke-1" />
        </button>
        <div className="flex flex-1 justify-center">
          <Link
            href="/"
            className="font-mono w-min text-center align-middle text-2xl p-0 font-bold"
          >
            Futile
          </Link>
        </div>
        <Link
          href="/account"
          className="dark:bg-pri-d rounded-full w-8 h-8 justify-self-end"
        >
          <IconUserCircle className="h-full w-auto stroke-1" />
        </Link>
        {/* <button
          className="bg-sec border-2 border-acc dark:bg-pri-d rounded-full w-8 h-8 justify-self-end p-1"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          {mounted ? <ThemeIcon className="text-acc" /> : null}
        </button> */}
      </nav>
      <main className="bg-pri dark:bg-pri-d h-auto flex-grow">
        <NextAuthProvider>{children}</NextAuthProvider>
      </main>
    </>
  )
}
