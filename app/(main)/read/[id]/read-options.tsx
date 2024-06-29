"use client"

import { DefaultInput } from "@/components/input"
import OrbitalMenu, { OrbitalMenuHandle } from "@/components/nav/orbital-menu"
import Popup from "@/components/popups/empty"
import useDELETE from "@/hooks/fetchers/useDELETE"
import usePopup from "@/hooks/usePopup"
import { Tile } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"

const menuOptions = [
  { label: "edit", value: "edit" },
  { label: "delete", value: "delete" },
  { label: "TODO category", value: "category" },
]

export const ReadOptions = ({ tile }: { tile: Tile }) => {
  const { trigger, success, error } = useDELETE(`/api/tile?id=${tile.id}`)
  const menuRef = useRef<OrbitalMenuHandle>(null)
  const router = useRouter()
  // delete popup
  const { showPopup, isUp, register } = usePopup({
    onOK() {
      trigger({ password })
    },
    onCancel() {
      menuRef.current?.home()
    },
  })

  // useEffect(() => {
  if (success) router.push("/read")
  if (error) menuRef.current?.home()
  // }, [router, success, error])

  const [password, setPassword] = useState("")

  const handleSettle = useCallback(
    (opt: any) => {
      console.log(opt)
      if (opt.value === "delete") {
        showPopup()
      }
    },
    [showPopup]
  )

  return (
    <>
      <OrbitalMenu
        ref={menuRef}
        colour="text-dim"
        pos="tr"
        rad={24}
        alpha={45}
        onSettle={handleSettle}
        // titleOption=" "
        options={menuOptions}
      />
      <Popup
        title="title"
        message="deleting this requires password reprompt"
        {...register}
      >
        <DefaultInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
      </Popup>
    </>
  )
}
