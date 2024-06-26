import { IconAlertCircle } from "@tabler/icons-react"
import clsx from "clsx"
import React, { HTMLInputTypeAttribute, useRef, useState } from "react"

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: HTMLInputTypeAttribute
  placeholder?: string
  error: string | undefined
  className?: string
  classNameOnError?: string
  outline?: boolean
}
export const DefaultInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type = "text",
      placeholder = "",
      error,
      className,
      classNameOnError,
      outline = true,
      ...props
    },
    ref
  ) => {
    const [clicked, setClicked] = useState(false)
    const timer = useRef<NodeJS.Timeout>()

    const toggleError = async () => {
      if (clicked) {
        setClicked(false)
        clearTimeout(timer.current)
      } else {
        setClicked(true)
        timer.current = setTimeout(() => {
          console.log("running tiumeout")
          setClicked(false)
        }, 2000)
      }
    }
    return (
      <div className="w-full block relative">
        <input
          placeholder={placeholder}
          type={type}
          className="w-full bg-pri text-center"
          ref={ref}
          {...props}
        ></input>
        {error && (
          <>
            <IconAlertCircle
              className="absolute right-0 top-0 h-full pr-1 stroke-danger my-auto peer w-6"
              onClick={toggleError}
            />

            <span
              className={clsx(
                "before:block before:absolute before:w-2 before:h-2 before:-top-1 before:right-3 before:rotate-45 before:bg-danger",
                "bg-danger text-white font-mono hyphens-auto w-max max-w-full rounded-sm p-1 z-10 right-0 block absolute top-full pointer-events-none text-xs transition-opacity opacity-0 peer-hover:opacity-100",
                clicked && "opacity-100"
              )}
            >
              {error}
            </span>
          </>
        )}
      </div>
    )
  }
)

DefaultInput.displayName = "DefaultInput"
