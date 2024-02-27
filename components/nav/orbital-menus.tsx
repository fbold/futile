"use client"

import OrbitalMenu, { OrbitalMenuOption } from "@/components/nav/orbital-menu"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

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

export default function OrbitalMenus({
  categories,
}: {
  categories: OrbitalMenuOption[]
}) {
  const router = useRouter()

  const handleCategorySettle = useCallback(
    (category: OrbitalMenuOption) => {
      router.push(`/read/${category.value}`)
    },
    [router]
  )

  const handleNavSettle = useCallback(
    (option: OrbitalMenuOption) => {
      router.push(`/${option.value}`)
    },
    [router]
  )
  return (
    <>
      <OrbitalMenu
        options={categories}
        onSettle={handleCategorySettle}
        colour="text-red-400"
        pos="tl"
      />
      <OrbitalMenu
        options={generalOptions}
        onSettle={handleNavSettle}
        colour="text-yellow-300"
        pos="tr"
        rad={30}
        alpha={43}
      />
    </>
  )
}
