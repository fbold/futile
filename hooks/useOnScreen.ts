import { RefObject, useEffect, useState } from "react"

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  callback?: () => any
) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
      if (entry.isIntersecting && callback) callback()
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return isIntersecting
}
