"use client"

import OrbitalMenu, {
  OrbitalMenuHandle,
  OrbitalMenuOption,
} from "@/components/nav/orbital-menu"
import { logout } from "@/lib/actions/logout"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"

const generalOptions: OrbitalMenuOption[] = [
  {
    label: ".me",
    value: "me",
  },
  {
    label: "visit",
    value: "visit",
  },
  {
    label: "logout",
    value: "logout",
  },
]

const findInOptions = (value: string, options: OrbitalMenuOption[]) => {
  return options.findIndex((opt) => opt.value === value) || 0
}

export default function OrbitalMenus({
  categories,
}: {
  categories: OrbitalMenuOption[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const handleReadSelect = useCallback(
    (category: OrbitalMenuOption) => {
      router.push(`/read?c=${category.value}`)
    },
    [router]
  )

  const handleWriteSelect = useCallback(
    (option: OrbitalMenuOption) => {
      router.push(`/write?c=${option.value}`)
    },
    [router]
  )

  const handleMetaSelect = useCallback(
    async (option: OrbitalMenuOption) => {
      if (option.value === "logout") {
        await logout()
        return router.push("/login")
      }
      router.push(`/meta/${option.value}`)
    },
    [router]
  )

  const readMenuRef = useRef<OrbitalMenuHandle>(null)
  const writeMenuRef = useRef<OrbitalMenuHandle>(null)
  const metaMenuRef = useRef<OrbitalMenuHandle>(null)

  useEffect(() => {
    if (!pathname.startsWith("/read")) readMenuRef.current?.home()
    if (!pathname.startsWith("/write")) writeMenuRef.current?.home()
    if (!pathname.startsWith("/meta")) metaMenuRef.current?.home()
  }, [pathname])

  useEffect(() => {
    const currentCat = params.get("c")
    if (pathname.startsWith("/read") && currentCat)
      readMenuRef.current?.to(findInOptions(currentCat, categories))
    if (pathname.startsWith("/write") && currentCat)
      writeMenuRef.current?.to(findInOptions(currentCat, categories))
    if (pathname.startsWith("/meta"))
      metaMenuRef.current?.to(
        findInOptions(pathname.split("/meta/")[1], generalOptions)
      )
  }, [])

  return (
    <>
      <OrbitalMenu
        // hidden={!pathname.includes("/read/")}
        titleOption="read"
        ref={readMenuRef}
        options={categories}
        onSettle={handleReadSelect}
        colour="text-r"
        pos="tl"
      />
      <OrbitalMenu
        // hidden={!pathname.endsWith("/me") && !pathname.endsWith("/visit")}
        titleOption="write"
        ref={writeMenuRef}
        options={categories}
        onSettle={handleWriteSelect}
        colour="text-y"
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
        colour="text-g"
        pos="br"
        rad={40}
        alpha={20}
      />
      {/* ) : null} */}
    </>
  )
}
