"use client"
import clsx from "clsx"
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react"

const ALPHA = 30 // The angle between each option
const R = 45 // The radius of the circle around which the options are
const SETTLE_DELAY = 1000 // Delay before the menu settles on an option

let timeout: null | ReturnType<typeof setTimeout> = null

type OrbitalMenuProps = {
  categories: string[]
  onSettle: (_: string) => void
}

function OrbitalMenu({ categories, onSettle }: OrbitalMenuProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeTile, setActiveTile] = useState(0)
  const [angularOffset, setAngularOffset] = useState(0)
  const [shown, setShown] = useState(false)

  const handleTileClick = (tileIdx: number) => {
    // Sets the tile thats clicked and moves the orbit there
    // Sets the exact scroll amount as well to keep in sync
    // with angular offset
    setAngularOffset(-tileIdx * ALPHA)
    setActiveTile(tileIdx)
    onSettle(categories[tileIdx])
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current
    const scrollAmount =
      (tileIdx * (scrollHeight - offsetHeight)) / categories.length
    scrollRef.current?.scrollTo({ behavior: "instant", top: scrollAmount })
  }

  const settleScroll = useCallback((offset: number) => {
    // Find closest option by seeing if the diff btwn
    // current angle and the angle of an option is smaller
    // than half of ALHPA
    console.log(Math.abs(0 * ALPHA - offset))
    for (let i = 0; i < categories.length; i++) {
      if (Math.abs(i * ALPHA - offset) < 0.5 * ALPHA) {
        setActiveTile(i)
        setAngularOffset(-i * ALPHA)
        onSettle(categories[i])
        return
      }
    }
    setActiveTile(categories.length - 1)
    setAngularOffset(-(categories.length - 1) * ALPHA)
    onSettle(categories.at(-1)!)
  }, [])

  const handleScroll = (event: Event) => {
    if (!scrollRef.current) return
    if (timeout) clearTimeout(timeout)
    const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current
    const scrollRatio = scrollTop / (scrollHeight - offsetHeight)
    const angularOffset_ = scrollRatio * categories.length * ALPHA
    setAngularOffset(-angularOffset_)
    timeout = setTimeout(settleScroll, SETTLE_DELAY, angularOffset_)
  }

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ behavior: "instant", top: 0 })
    const ref = scrollRef.current
    ref.addEventListener("scroll", handleScroll, { passive: true })
    // ref.addEventListener("", handleScroll, { passive: true })

    return () => {
      ref?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const showCategories = () => {
    setShown(true)
  }
  const hideCategories = () => {
    setShown(false)
  }

  return (
    <>
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`relative top-0 left-0 aspect-square  outline outline-2 outline-red-400
      overflow-hidden rounded-full w-20 peer`}
          // style={{ width: `${5 * R}px` }}
        >
          <div
            className="absolute overflow-auto top-0 bottom-0 left-0 -right-0 h-full scroll-auto"
            ref={scrollRef}
            onMouseEnter={showCategories}
            onMouseLeave={hideCategories}
          >
            <div className="h-full" />
            {categories.map((cat) => (
              <Fragment key={cat}>
                <div key={cat + "a"} className="h-full" />
                <div key={cat + "b"} className="h-full" />
                {/* <div key={cat + 2} className="h-full" />
                <div key={cat + 3} className="h-full" />
                <div key={cat + 4} className="h-full" /> */}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center absolute">
        <div
          className=" relative transition-transform duration-100 h-0 aspect-square origin-top-left"
          style={{
            transform: `rotateZ(${angularOffset}deg)`,
          }}
        >
          {categories.map((category, i) => {
            const rotation = i * ALPHA
            const translationY = Math.sin((rotation * Math.PI) / 180) * R
            const translationX = Math.cos((rotation * Math.PI) / 180) * R
            return (
              <div
                key={category}
                className="absolute top-0 left-0 h-0 cursor-pointer transition-transform transition-opacity duration-1000"
                style={{
                  opacity: i === activeTile ? 1 : 1,
                  transformOrigin: "left",
                  rotate: `${rotation}deg`,
                  translate: `${translationX}px ${translationY}px`,
                }}
              >
                {category !== "__RESTART__" ? (
                  <p
                    className={clsx(
                      "-translate-y-1/2 transition-opacity duration-150",
                      activeTile === i || shown
                        ? "opacity-1"
                        : "delay-1000 opacity-0"
                    )}
                    onClick={() => handleTileClick(i)}
                  >
                    {category}
                  </p>
                ) : (
                  <p
                    className="-translate-y-1/2"
                    onClick={() => setActiveTile(0)}
                  >
                    {categories[0]}
                  </p>
                )}
              </div>
            )
          })}
        </div>
        <div className="h-0 pl-28">
          <p className="-translate-y-1/2">
            of a futile kind; hailing from a troubled mind
          </p>
        </div>
      </div>
    </>
  )
}

export default memo(OrbitalMenu)
