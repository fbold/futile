"use client"

import { DefaultInput } from "@/components/input"
import OrbitalMenu, { OrbitalMenuHandle } from "@/components/nav/orbital-menu"
import Popup from "@/components/popups/empty"
import useDELETE from "@/hooks/fetchers/useDELETE"
import usePopup from "@/hooks/usePopup"
import { Tile } from "@prisma/client"
import { useCallback, useRef, useState } from "react"

const menuOptions = [
  { label: "edit", value: "edit" },
  { label: "delete", value: "delete" },
]

export const ReadOptions = ({ tile }: { tile: Tile }) => {
  // delete popup
  const { trigger } = useDELETE(`/api/tile?id=${tile.id}`)
  const menuRef = useRef<OrbitalMenuHandle>(null)

  const { showPopup, isUp, register } = usePopup({
    onOK() {
      trigger({ password })
    },
    onCancel() {
      menuRef.current?.home()
    },
  })

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
        titleOption=" "
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
