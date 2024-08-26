"use client"

import OrbitalMenu, {
  OrbitalMenuHandle,
  OrbitalMenuOption,
} from "@/components/nav/orbital-menu"
import { logout } from "@/lib/actions/logout"
import { Category } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"

const generalOptions: OrbitalMenuOption[] = [
  {
    label: ".me",
    id: ".me",
    href: "/meta/me",
  },
  {
    label: "visit",
    id: "visit",
    href: "/meta/visit",
  },
  {
    label: "man",
    id: "man",
    href: "meta/man",
  },
  {
    label: "logout",
    id: "logout",
    action: "logout",
  },
]

const voidOptions: OrbitalMenuOption[] = [
  {
    label: "random",
    id: "random",
    href: "/void/random",
    // className: "font-bold text-black",
  },
  {
    label: "all",
    id: "all",
    href: "/void",
    // className: "font-bold text-black",
  },
]

const findInOptions = (
  id: string,
  options: OrbitalMenuOption[],
  check?: "href" | "id"
) => {
  if (check === "id") return options.findIndex((opt) => opt.id === id) || 0
  if (check === "href") return options.findIndex((opt) => opt.href === id) || 0
  return options.findIndex((opt) => opt.id === id) || 0
}

export default function OrbitalMenus({
  categories,
}: {
  categories: Category[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const categoryReadOptions = categories.map((cat) => ({
    label: cat.label,
    id: cat.id,
    href: `/read?c=${cat.id}`,
  }))

  const categoryWriteOptions = categories.map((cat) => ({
    label: cat.label,
    id: cat.id,
    href: `/write?c=${cat.id}`,
  }))

  const handleReadSelect = useCallback(
    (category: OrbitalMenuOption) => {
      router.push(`/read?c=${category.id}`)
    },
    [router]
  )

  const handleWriteSelect = useCallback(
    (option: OrbitalMenuOption) => {
      router.push(`/write?c=${option.id}`)
    },
    [router]
  )

  const handleMetaSelect = useCallback(
    async (option: OrbitalMenuOption) => {
      if (option.action === "logout") {
        await logout()
        return router.push("/login")
      } else router.push(option.href!)
    },
    [router]
  )

  const handleVoidSelect = useCallback(
    async (option: OrbitalMenuOption) => {
      if (option.action) console.log("missing action definition")
      else router.push(option.href!)
    },
    [router]
  )

  const readMenuRef = useRef<OrbitalMenuHandle>(null)
  const writeMenuRef = useRef<OrbitalMenuHandle>(null)
  const metaMenuRef = useRef<OrbitalMenuHandle>(null)
  const voidMenuRef = useRef<OrbitalMenuHandle>(null)

  useEffect(() => {
    if (!pathname.startsWith("/read")) readMenuRef.current?.home()
    if (!pathname.startsWith("/write")) writeMenuRef.current?.home()
    if (!pathname.startsWith("/meta")) metaMenuRef.current?.home()
    if (!pathname.startsWith("/void")) voidMenuRef.current?.home()
  }, [pathname])

  useEffect(() => {
    const currentCat = params.get("c")
    if (pathname.startsWith("/read") && currentCat)
      readMenuRef.current?.to(findInOptions(currentCat, categoryReadOptions))
    else if (pathname.startsWith("/write") && currentCat)
      writeMenuRef.current?.to(findInOptions(currentCat, categoryWriteOptions))
    else if (pathname.startsWith("/meta"))
      metaMenuRef.current?.to(findInOptions(pathname, generalOptions, "href"))
    else if (pathname.startsWith("/void"))
      voidMenuRef.current?.to(findInOptions(pathname, voidOptions, "href"))
  }, [params, pathname])

  return (
    <>
      <OrbitalMenu
        // hidden={!pathname.includes("/read/")}
        titleOption="read"
        ref={readMenuRef}
        options={categoryReadOptions}
        onSettle={handleReadSelect}
        colour="rd"
        pos="tl"
      />
      <OrbitalMenu
        // hidden={!pathname.endsWith("/me") && !pathname.endsWith("/visit")}
        titleOption="write"
        ref={writeMenuRef}
        options={categoryWriteOptions}
        onSettle={handleWriteSelect}
        colour="yw"
        pos="tr"
        // rad={30}
        // alpha={43}
      />
      {/* {pathname.endsWith("/me") ? ( */}
      <OrbitalMenu
        titleOption="meta"
        ref={metaMenuRef}
        options={generalOptions}
        onSettle={handleMetaSelect}
        colour="gn"
        pos="br"
        rad={40}
        alpha={20}
      />
      {/* ) : null} */}
      <OrbitalMenu
        titleOption="void"
        ref={voidMenuRef}
        options={voidOptions}
        onSettle={handleVoidSelect}
        colour="white"
        pos="bl"
        rad={25}
        alpha={35}
        thickness={1}
        // fill
      />
    </>
  )
}
