"use client"

import { DefaultInput } from "@/components/input"
import OrbitalMenu, { OrbitalMenuHandle } from "@/components/nav/orbital-menu"
import Popup from "@/components/popups/empty"
import useDELETE from "@/hooks/fetchers/useDELETE"
import usePATCH from "@/hooks/fetchers/usePATCH"
import usePopup from "@/hooks/usePopup"
import { Tile } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"

const menuOptions = [
  { label: "edit", value: "edit" },
  { label: "delete", value: "delete" },
  { label: "category", value: "category" },
  { label: "void", value: "void" },
]

export const ReadOptions = ({ tile }: { tile: Tile }) => {
  const {
    trigger: triggerDelete,
    success,
    error,
  } = useDELETE(`/api/tile?id=${tile.id}`)
  const {
    trigger: triggerVoid,
    success: successVoid,
    error: errorVoid,
  } = usePATCH(`/api/tile/void?id=${tile.id}`)
  const menuRef = useRef<OrbitalMenuHandle>(null)
  const router = useRouter()
  // delete popup
  const {
    showPopup: showDeletePopup,
    isUp,
    register: registerDeletePopup,
  } = usePopup({
    onOK() {
      triggerDelete({ password })
    },
    onCancel() {
      menuRef.current?.home()
    },
  })

  // void popup
  const { showPopup: showVoidPopup, register: registerVoidPopup } = usePopup({
    onOK() {
      triggerVoid({ password })
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
        showDeletePopup()
      } else if (opt.value === "void") {
        showVoidPopup()
      }
    },
    [showDeletePopup]
  )

  return (
    <>
      <OrbitalMenu
        ref={menuRef}
        colour="text-dim"
        pos="tr"
        rad={24}
        alpha={36}
        onSettle={handleSettle}
        // titleOption=" "
        options={menuOptions}
      />
      <Popup
        title="delete document"
        message="deleting this requires password reprompt"
        {...registerDeletePopup}
      >
        <DefaultInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
      </Popup>
      <Popup
        title="send to the void"
        message={
          <p>
            sending this to the void requires password reprompt. once in the
            void it{" "}
            <span className="underline">cannot be reclaimed, only deleted</span>
          </p>
        }
        {...registerVoidPopup}
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
