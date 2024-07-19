"use client"

import { DefaultButton } from "@/components/buttons"
import { TextButton } from "@/components/buttons/text-button"
import { ReactNode } from "react"
import { createPortal } from "react-dom"

type PopupProps = {
  show: boolean
  title: string
  message?: string | ReactNode
  onOK: () => any
  onCancel?: () => void
  children?: ReactNode
}

export default function Popup({
  show,
  title,
  message,
  onOK,
  onCancel,
  children,
}: PopupProps) {
  return show
    ? createPortal(
        <div className="fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" bg-sec p-5 min-w-1/5 md:w-1/2 xl:w-1/3 mx-6 flex flex-row gap-4 justify-between">
            <div className="flex-grow ">
              <p className="font-semibold">{title}</p>
              {typeof message === "string" ? <p>{message}</p> : message}
              <div className="mt-2">{children}</div>
            </div>
            <div className="flex flex-col justify-end text-right gap-1">
              <DefaultButton className="text-text text-right" onClick={onOK}>
                ok
              </DefaultButton>
              <TextButton className="text-dim" onClick={onCancel}>
                cancel
              </TextButton>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
