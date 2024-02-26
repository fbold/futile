"use client"
import clsx from "clsx"
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react"

const ALPHA = 30 // The angle between each option
const R = 45 // The radius of the circle around which the options are
const SETTLE_DELAY = 1000 // Delay before the menu settles on an option
const HIDE_DELAY = 1000 // Delay before the non active categories are set to hide

let settleTimeout: null | ReturnType<typeof setTimeout> = null
let hideTimeout: null | ReturnType<typeof setTimeout> = null

type OrbitalMenuProps = {
  categories: string[]
  onSettle: (_: string) => void
}

function OrbitalMenu({ categories, onSettle }: OrbitalMenuProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)
  const [angularOffset, setAngularOffset] = useState(0)
  const [shown, setShown] = useState(false)

  const handleCategorySelect = (categoryIndex: number) => {
    console.log("Setting category")
    // Sets the active category and syncs scrolls to it
    // Used by both methods of selection: settle and click
    setActiveCategory(categoryIndex)
    // So that they all hide at once (see conditional classes
    // below) we clear timeout and hide from now so it is set
    // at same time as active category
    if (hideTimeout) clearTimeout(hideTimeout)
    setShown(false)
    // SYNC scrolls to category
    const { scrollHeight, offsetHeight } = scrollRef.current!
    // set angular scroll
    setAngularOffset(-categoryIndex * ALPHA)
    // set linear scroll
    const scrollAmount =
      (categoryIndex * (scrollHeight - offsetHeight)) / (categories.length - 1)
    scrollRef.current?.removeEventListener("scroll", handleScroll)
    scrollRef.current?.scrollTo({ behavior: "instant", top: scrollAmount })
    scrollRef.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    })
  }

  const handleTileClick = (categoryIdx: number) => {
    // Sets the tile thats clicked and moves the orbit there
    // Sets the exact scroll amount as well to keep in sync
    // with angular offset
    // setAngularOffset(-tileIdx * ALPHA)
    // setActiveCategory(tileIdx)
    handleCategorySelect(categoryIdx)
    onSettle(categories[categoryIdx])

    // If there is a scroll settle timeout waiting, clear it
    if (settleTimeout) clearTimeout(settleTimeout)
  }

  const settleScroll = useCallback(
    (offset: number) => {
      // Find closest option by seeing if the diff btwn
      // current angle and the angle of an option is smaller
      // than half of ALHPA
      for (let i = 0; i < categories.length; i++) {
        if (Math.abs(i * ALPHA - offset) <= 0.5 * ALPHA) {
          // setActiveCategory(i)
          // setAngularOffset(-i * ALPHA)
          handleCategorySelect(i)
          onSettle(categories[i])
          return
        }
      }
      // If we get to here and no cat has been settled on
      // Settle on the last as we assume it has gone past
      // setActiveCategory(categories.length - 1)
      // setAngularOffset(-(categories.length - 1) * ALPHA)
      handleCategorySelect(categories.length - 1)
      onSettle(categories.at(-1)!)
    },
    [categories, onSettle]
  )

  const handleScroll = useCallback(
    (event: Event) => {
      console.log("scrolling")
      // Translates element scroll to angular scroll
      if (!scrollRef.current) return
      if (settleTimeout) clearTimeout(settleTimeout) // Cancel any settling as we are still scrolling
      const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current
      const scrollRatio = scrollTop / (scrollHeight - offsetHeight)
      const angularOffset_ = scrollRatio * (categories.length - 1) * ALPHA
      setAngularOffset(-angularOffset_)
      settleTimeout = setTimeout(settleScroll, SETTLE_DELAY, angularOffset_)
    },
    [categories, settleScroll]
  )

  useEffect(() => {
    // This just sets our event listeners on scroll
    // Used for scroll select
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ behavior: "instant", top: 0 })
    const ref = scrollRef.current
    ref.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      ref?.removeEventListener("scroll", handleScroll)
    }
  }, [settleScroll, categories])

  const showCategories = () => {
    setShown(true)
  }
  const hideCategories = () => {
    hideTimeout = setTimeout(() => {
      setShown(false)
    }, HIDE_DELAY)
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
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center absolute">
        <div
          className=" relative transition-transform h-0 aspect-square origin-top-left"
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
                className={clsx(
                  "absolute top-0 left-0 h-0 cursor-pointer transition-opacity duration-700",
                  shown || i === activeCategory
                    ? "opacity-1"
                    : "opacity-0 delay-200"
                )}
                style={{
                  opacity: shown || i === activeCategory ? 1 : 0,
                  transformOrigin: "left",
                  rotate: `${rotation}deg`,
                  translate: `${translationX}px ${translationY}px`,
                }}
              >
                <p
                  className={clsx(
                    "-translate-y-1/2",
                    activeCategory === i && "text-red-400"
                    // activeCategory === i || activeCategory
                    //   ? "opacity-1"
                    //   : "delay-1000 opacity-0"
                  )}
                  onClick={(e) => handleTileClick(i)}
                >
                  {category}
                </p>
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
