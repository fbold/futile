"use client"
import { IconAlertOctagon } from "@tabler/icons-react"
import clsx from "clsx"
import React, { HTMLInputTypeAttribute, useRef, useState } from "react"

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type: HTMLInputTypeAttribute
  placeholder: string
  error: string | null
  className?: string
  classNameOnError?: string
  outline?: boolean
}

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      placeholder,
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
      <div className="w-full flex flex-col gap-[1px] relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            `p-2 px-2 max-h-10 text-txt-pri dark:text-txt-pri-d ${className}`,
            !error && "focus:outline-acc dark:focus:outline-acc-d",
            error && (classNameOnError || "outline-1 outline outline-red-500"),
            outline
              ? "focus:outline focus:outline-1"
              : "focus:outline-none focus:outline-0"
          )}
          aria-invalid={error ? "true" : "false"}
          {...props}
        ></input>
        {error && (
          <>
            <IconAlertOctagon
              className="absolute right-0 h-full pr-1 stroke-red-500 my-auto peer w-7"
              onClick={toggleError}
            />

            <span
              className={clsx(
                "before:block before:absolute before:w-2 before:h-2 before:-top-1 before:right-3 before:rotate-45 before:bg-red-500",
                "bg-red-500 text-white w-max max-w-full rounded-md p-2 z-10 right-0 block absolute top-full pointer-events-none text-xs transition-opacity opacity-0 peer-hover:opacity-100",
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
TextInput.displayName = "TextInput"
