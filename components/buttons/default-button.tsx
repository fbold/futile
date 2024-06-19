import clsx from "clsx"
import Link from "next/link"
import React, { MouseEventHandler, PropsWithChildren } from "react"

type DefaultButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: string
  className?: string
  type?: "button" | "submit" | "reset"
}

export const DefaultButton: React.FC<PropsWithChildren<DefaultButtonProps>> = ({
  onClick,
  href,
  children,
  className,
  type,
}) => {
  if (href)
    return (
      <Link
        href={href}
        className={clsx(
          "text-text underline bg-transparent flex items-center justify-center",
          className
        )}
      >
        {children}
      </Link>
    )
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className={clsx(
        "text-text border px-6 border-gray-400 bg-transparent flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  )
}
