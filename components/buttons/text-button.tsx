import clsx from "clsx"
import React, { MouseEventHandler, PropsWithChildren } from "react"

type DefaultButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: "button" | "submit" | "reset"
}

export const TextButton: React.FC<PropsWithChildren<DefaultButtonProps>> = ({
  onClick,
  children,
  className,
  type,
}) => {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className={clsx(
        "bg-transparent border-none text-center outline-none underline cursor-pointer text-dim",
        className
      )}
    >
      {children}
    </button>
  )
}
