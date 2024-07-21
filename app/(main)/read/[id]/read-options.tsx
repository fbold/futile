"use client"

import { DefaultInput } from "@/components/input"
import OrbitalMenu, { OrbitalMenuHandle } from "@/components/nav/orbital-menu"
import RequestPopup from "@/components/popups/request"
import useDELETE from "@/hooks/fetchers/useDELETE"
import usePATCH from "@/hooks/fetchers/usePATCH"
import usePopup from "@/hooks/usePopup"
import { Tile } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const menuOptions = [
  { label: "edit", value: "edit" },
  { label: "delete", value: "delete" },
  { label: "category", value: "category" },
  { label: "publish to void", value: "void" },
]

export const ReadOptions = ({ tile }: { tile: Tile }) => {
  const [password, setPassword] = useState("")

  // delete
  const {
    trigger: triggerDelete,
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useDELETE(`/api/tile?id=${tile.id}`)

  // delete popup
  const {
    showPopup: showDeletePopup,
    isUp,
    register: registerDeletePopup,
  } = usePopup({
    type: "request",
    onOK() {
      triggerDelete({ password })
    },
    onCancel() {
      menuRef.current?.home()
    },
  })

  // void patch
  const {
    trigger: triggerVoid,
    loading: loadingVoid,
    success: successVoid,
    error: errorVoid,
  } = usePATCH(`/api/tile/void?id=${tile.id}`)
  const menuRef = useRef<OrbitalMenuHandle>(null)
  const router = useRouter()

  // void popup
  const { showPopup: showVoidPopup, register: registerVoidPopup } = usePopup({
    type: "request",
    onOK() {
      triggerVoid({ password })
    },
    onCancel() {
      menuRef.current?.home()
    },
  })

  useEffect(() => {
    if (successDelete) router.push("/read")
    if (successVoid) router.push(`/void/${tile.id}`)
    if (errorDelete || errorVoid) menuRef.current?.home()
  }, [successDelete, successVoid, errorDelete, errorVoid])

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
        options={menuOptions}
      />
      <RequestPopup
        title="delete document"
        message="deleting this requires password reprompt"
        loading={loadingDelete}
        {...registerDeletePopup}
      >
        <DefaultInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
      </RequestPopup>
      <RequestPopup
        title="send to the void"
        message={
          <p>
            sending this to the void requires password reprompt. <br />
            once in the void it{" "}
            <span className="underline">cannot be reclaimed, only deleted</span>
          </p>
        }
        loading={loadingVoid}
        {...registerVoidPopup}
      >
        <DefaultInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
      </RequestPopup>
    </>
  )
}
