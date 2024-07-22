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

const voidOptions: OrbitalMenuOption[] = [
  {
    label: "random",
    value: "random",
    // className: "font-bold text-black",
  },
  {
    label: "all",
    value: "",
    // className: "font-bold text-black",
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

  const handleVoidSelect = useCallback(
    async (option: OrbitalMenuOption) => {
      router.push(`/void/${option.value}`)
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
      readMenuRef.current?.to(findInOptions(currentCat, categories))
    else if (pathname.startsWith("/write") && currentCat)
      writeMenuRef.current?.to(findInOptions(currentCat, categories))
    else if (pathname.startsWith("/meta"))
      metaMenuRef.current?.to(
        findInOptions(pathname.split("/meta/")[1], generalOptions)
      )
    // else if (pathname.startsWith("/void"))
    //   voidMenuRef.current?.to(
    //     findInOptions(pathname.split("/void/")[1], generalOptions)
    //   )
  }, [params, pathname])

  return (
    <>
      <OrbitalMenu
        // hidden={!pathname.includes("/read/")}
        titleOption="read"
        ref={readMenuRef}
        options={categories}
        onSettle={handleReadSelect}
        colour="rd"
        pos="tl"
      />
      <OrbitalMenu
        // hidden={!pathname.endsWith("/me") && !pathname.endsWith("/visit")}
        titleOption="write"
        ref={writeMenuRef}
        options={categories}
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
