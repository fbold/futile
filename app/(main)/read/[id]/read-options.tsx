"use client"

import { DefaultInput } from "@/components/input"
import OrbitalMenu from "@/components/nav/orbital-menu"
import Popup from "@/components/popups/empty"
import useDELETE from "@/hooks/fetchers/useDELETE"
import usePopup from "@/hooks/usePopup"
import { Tile } from "@prisma/client"
import { useRef, useState } from "react"

export const ReadOptions = ({ tile }: { tile: Tile }) => {
  // delete popup
  const { trigger } = useDELETE(`/api/tile?id=${tile.id}`)
  const menuRef = useRef(null)

  const { showPopup, isUp, register } = usePopup({
    onOK: () => trigger({ password }),
  })

  const [password, setPassword] = useState("")

  const handleSettle = (opt: any) => {
    console.log(opt)
    if (opt.value === "delete") {
      showPopup()
    }
  }

  return (
    <>
      <OrbitalMenu
        ref={menuRef}
        colour="text-dim"
        pos="tr"
        rad={24}
        alpha={45}
        onSettle={handleSettle}
        titleOption="_"
        options={[
          { label: "edit", value: "edit" },
          { label: "delete", value: "delete" },
        ]}
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
