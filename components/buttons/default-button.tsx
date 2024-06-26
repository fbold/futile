import { IconLoader2 } from "@tabler/icons-react"
import { IconAlertCircle } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react"

type DefaultButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: string
  className?: string
  type?: "button" | "submit" | "reset"
  error?: string | null
  loading?: boolean
}

export const DefaultButton: React.FC<PropsWithChildren<DefaultButtonProps>> = ({
  onClick,
  href,
  children,
  className,
  type,
  error,
  loading,
}) => {
  const [clicked, setClicked] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  const toggleError = async () => {
    if (clicked) {
      setClicked(false)
      clearTimeout(timer.current)
    } else {
      setClicked(true)
      timer.current = setTimeout(() => {
        setClicked(false)
      }, 2000)
    }
  }

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
    <div className="block relative">
      <button
        type={type || "submit"}
        onClick={onClick}
        className={clsx(
          "w-full text-text border px-6 border-dim bg-transparent flex items-center justify-center",
          className
        )}
      >
        {children}
      </button>
      {error && (
        <>
          <IconAlertCircle
            className="absolute right-0 top-0 h-full pr-1 stroke-red-500 my-auto peer w-6"
            onClick={toggleError}
          />

          <span
            className={clsx(
              "before:block before:absolute before:w-2 before:h-2 before:-top-1 before:right-3 before:rotate-45 before:bg-red-500",
              "bg-red-500 text-white font-mono hyphens-auto w-max max-w-full rounded-sm p-1 z-10 right-0 block absolute top-full pointer-events-none text-xs transition-opacity opacity-0 peer-hover:opacity-100",
              clicked && "opacity-100"
            )}
          >
            {error}
          </span>
        </>
      )}
      {loading ? (
        <IconLoader2 className="absolute right-0 top-0 h-full mr-1 my-auto peer w-5 animate-spin stroke-dim" />
      ) : null}
    </div>
  )
}
