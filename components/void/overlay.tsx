"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"


export const VoidOverlay = () => {
  const [relax, setRelax] = useState(false)


  useEffect(() => {
    // client side trigger relax animation
    setRelax(true)
  }, [])

  return (
    <div className={clsx("z-50 transition-all duration-500 pointer-events-none fixed top-0 left-0 w-full h-full border-text",
      relax ? "backdrop-invert-0" : "backdrop-invert")}>
    </div>
  )
}
