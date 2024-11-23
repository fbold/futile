import { cn } from "@/lib/cn"

const style = {
  fontSize: "14px"
}

const classNameLetter = "shrink text-center align-middle justify-center"

export function VoidIcon({ className }: { className?: string }) {
  return (
    <div className={cn("aspect-square bg-text leading-none outline-2 outline outline-text border-text w-8 h-8 grid grid-cols-4 font-extrabold font-mono text-sec", className)}>
      <span className={classNameLetter} style={style}>v</span>
      <span className={classNameLetter} style={style}>o</span>
      <span className={classNameLetter} style={style}>i</span>
      <span className={classNameLetter} style={style}>d</span>
    </div>
  )
}
