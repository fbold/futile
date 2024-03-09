"use client"

import OrbitalMenu, {
  OrbitalMenuHandle,
  OrbitalMenuOption,
} from "@/components/nav/orbital-menu"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef } from "react"

const generalOptions = [
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

  const handleCategorySettle = useCallback(
    (category: OrbitalMenuOption) => {
      router.push(`/read?c=${category.value}`)
    },
    [router]
  )

  const handleNavSettle = useCallback(
    (option: OrbitalMenuOption) => {
      router.push(`/write?c=${option.value}`)
    },
    [router]
  )

  const readMenuRef = useRef<OrbitalMenuHandle>(null)
  const writeMenuRef = useRef<OrbitalMenuHandle>(null)

  useEffect(() => {
    if (!pathname.startsWith("/read")) {
      readMenuRef.current?.home()
    }
  }, [pathname])

  useEffect(() => {
    const currentCat = params.get("c")
    if (pathname.startsWith("/read") && currentCat)
      readMenuRef.current?.to(findInOptions(currentCat, categories))
    if (pathname.startsWith("/write") && currentCat)
      writeMenuRef.current?.to(findInOptions(currentCat, categories))
  }, [])

  return (
    <>
      <OrbitalMenu
        // hidden={!pathname.includes("/read/")}
        // titleOption="read"
        ref={readMenuRef}
        options={categories}
        onSettle={handleCategorySettle}
        colour="text-red-400"
        pos="tl"
      />
      <OrbitalMenu
        // hidden={!pathname.endsWith("/me") && !pathname.endsWith("/visit")}
        // titleOption="nav&write"
        ref={writeMenuRef}
        options={categories}
        onSettle={handleNavSettle}
        colour="text-yellow-300"
        pos="tr"
        rad={30}
        alpha={43}
      />
      {pathname.endsWith("/me") ? (
        <OrbitalMenu
          options={[
            {
              label: "settings",
              value: "settings",
            },
            {
              label: "about",
              value: "about",
            },
          ]}
          onSettle={() => {}}
          colour="text-green-400"
          pos="br"
          rad={60}
          alpha={40}
        />
      ) : null}
    </>
  )
}
