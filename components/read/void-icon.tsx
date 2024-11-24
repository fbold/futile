import { cn } from "@/lib/cn"
import clsx from "clsx"
import { PropsWithChildren } from "react"

const style = {
  fontSize: "14px"
}

const classNameLetter = "shrink text-center align-middle justify-center"

type Props = PropsWithChildren<{ inVoid: boolean | undefined, className?: string }>

export function VoidIcon({ inVoid, className, children }: Props) {
  return (
    <>
      {inVoid ?
        <div className={cn("leading-none px-0.5 py-[1px] bg-text outline outline-1 outline-text w-9 grid grid-cols-4 font-extrabold font-mono text-sec",
          "-rotate-90 -translate-x-[calc(100%+7px)] origin-bottom-right",
          //"md:rotate-0 md:-translate-x-2 md:-translate-y-0.5 ",
          className)}>
          <span className={classNameLetter} style={style}>v</span>
          <span className={classNameLetter} style={style}>o</span>
          <span className={classNameLetter} style={style}>i</span>
          <span className={classNameLetter} style={style}>d</span>
        </div>
        : null}
      <h2 className={clsx("w-min h-9 leading-none content-center", inVoid && "outline outline-1 outline-text px-2 -translate-x-2")}>{children}</h2>
    </>

  )
}
