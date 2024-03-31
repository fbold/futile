"use client"

import { TextButton } from "@/components/buttons/text-button"
import { createPortal } from "react-dom"

type PopupProps = {
  show: boolean
  title: string
  message: string
  onOK: () => void
  onCancel: () => void
}

export default function Popup({
  show,
  title,
  message,
  onOK,
  onCancel,
}: PopupProps) {
  return show
    ? createPortal(
        <div className="fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="border border-text bg-sec p-5 min-w-1/5 flex flex-row gap-4 justify-between">
            <div>
              <h2>{title}</h2>
              <p>{message}</p>
            </div>
            <div className="flex flex-col justify-end text-right">
              <TextButton className="text-text text-right" onClick={onOK}>
                ok
              </TextButton>
              <TextButton className="text-gray-400" onClick={onCancel}>
                cancel
              </TextButton>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
