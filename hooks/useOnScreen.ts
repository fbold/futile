import { RefObject, useCallback, useEffect, useState } from "react"

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  callback?: () => any
) {
  const [isIntersecting, setIntersecting] = useState(false)

  const memoizedCallback = useCallback(() => {
    if (isIntersecting && callback) callback();
  }, [isIntersecting, callback]);

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  return isIntersecting
}
