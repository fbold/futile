"use client"

import { MutationButton } from "@/components/buttons"
import { TextButton } from "@/components/buttons/text-button"
import { IconAlertCircle } from "@tabler/icons-react"
import clsx from "clsx"
import { FormEventHandler, ReactNode } from "react"
import { createPortal } from "react-dom"

type PopupProps = {
  show: boolean
  title: string
  message?: string | ReactNode
  onOK: () => any
  onCancel?: () => void
  children?: ReactNode
  loading: boolean
  error?: string | null
}

export default function RequestPopup({
  show,
  title,
  message,
  onOK,
  onCancel,
  children,
  loading,
  error,
}: PopupProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onOK()
  }
  return show
    ? createPortal(
        <div className="fixed top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="relative bg-sec p-5 min-w-1/5 md:w-1/2 xl:w-1/3 mx-6 flex flex-row gap-4 justify-between"
          >
            {error && (
              <>
                <IconAlertCircle
                  className="absolute right-2 top-2 stroke-danger my-auto peer w-6"
                  // onClick={toggleError}
                />

                <span
                  className={clsx(
                    "before:block before:absolute before:w-2 before:h-2 before:-top-1 before:right-3 before:rotate-45 before:bg-danger",
                    "bg-danger text-white font-mono font-bold hyphens-auto w-max max-w-full rounded-sm p-1 z-10 top-9 right-1 block absolute pointer-events-none text-xs transition-opacity opacity-0 peer-hover:opacity-100"
                    // clicked && "opacity-100"
                  )}
                >
                  {error}
                </span>
              </>
            )}
            <div className="flex-grow ">
              <p className="font-semibold">{title}</p>
              {typeof message === "string" ? <p>{message}</p> : message}
              <div className="mt-2">{children}</div>
            </div>
            <div className="flex flex-col justify-end text-right gap-1">
              <MutationButton className="h-full" fetching={loading}>
                ok
              </MutationButton>
              <TextButton className="text-dim" onClick={onCancel}>
                cancel
              </TextButton>
            </div>
          </form>
        </div>,
        document.body
      )
    : null
}
