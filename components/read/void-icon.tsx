import { cn } from "@/lib/cn"
import clsx from "clsx"
import { PropsWithChildren } from "react"

const style = {
  fontSize: "14px",
}

const classNameLetter = "shrink text-center align-middle justify-center"

type Props = PropsWithChildren<{
  inVoid: boolean | undefined
  className?: string
}>

export function VoidIcon({ inVoid, className, children }: Props) {
  return (
    <div className="relative w-full">
      <h2 className="relative leading-[36px] pr-4">{children}</h2>
      <div
        className={clsx(
          "h-9 leading-none absolute w-full origin-bottom top-0 left-0 content-center whitespace-pre-line pointer-events-none",
          inVoid && "outline outline-1 outline-text px-2 -translate-x-2",
        )}
      >
        {inVoid ? (
          <div
            className={cn(
              "absolute top-0 left-0 leading-none px-0.5 py-[1px] bg-text outline outline-1 outline-text w-9 grid grid-cols-4 font-extrabold font-mono text-sec",
              "-rotate-90 origin-bottom -translate-x-[calc(50%)] translate-y-0.5",
              //"md:rotate-0 md:-translate-x-2 md:-translate-y-0.5 ",
              className,
            )}
          >
            <span className={classNameLetter} style={style}>
              v
            </span>
            <span className={classNameLetter} style={style}>
              o
            </span>
            <span className={classNameLetter} style={style}>
              i
            </span>
            <span className={classNameLetter} style={style}>
              d
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
