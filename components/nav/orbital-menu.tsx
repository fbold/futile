"use client"
import clsx from "clsx"
import {
  Fragment,
  createRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

const ALPHA = 22.5 // The angle between each option
export const R = 50 // The radius of the circle around which the options are
const SETTLE_DELAY = 1000 // Delay before the menu settles on an option
const HIDE_DELAY = 1000 // Delay before the non active categories are set to hide

let settleTimeout: null | ReturnType<typeof setTimeout> = null
let hideTimeout: null | ReturnType<typeof setTimeout> = null

const angularSign = {
  tr: -1,
  tl: 1,
}

const rorl = (pos: "tr" | "tl") => {
  const map = {
    tr: "right",
    tl: "left",
  }

  return map[pos]
}

export type OrbitalMenuOption = {
  value: string
  label: string
}

type OrbitalMenuProps = {
  options: OrbitalMenuOption[]
  onSettle: (_: OrbitalMenuOption) => void
  colour: string
  pos?: "tr" | "tl"
  rad?: number
  alpha?: number
}

function OrbitalMenu({
  options,
  onSettle,
  colour,
  pos = "tl",
  rad = R,
  alpha = ALPHA,
}: OrbitalMenuProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const categoriesRefs = useRef(
    options.map((c) => createRef<HTMLParagraphElement>())
  )
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
    setAngularOffset(-angularSign[pos] * categoryIndex * alpha)
    // set linear scroll
    const scrollAmount =
      (categoryIndex * (scrollHeight - offsetHeight)) / (options.length - 1)
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
    // setAngularOffset(-tileIdx * alpha)
    // setActiveCategory(tileIdx)
    handleCategorySelect(categoryIdx)
    onSettle(options[categoryIdx])

    // If there is a scroll settle timeout waiting, clear it
    if (settleTimeout) clearTimeout(settleTimeout)
  }

  const settleScroll = useCallback(
    (offset: number) => {
      // Find closest option by seeing if the diff btwn
      // current angle and the angle of an option is smaller
      // than half of ALHPA
      for (let i = 0; i < options.length; i++) {
        if (Math.abs(i * alpha - angularSign[pos] * offset) <= 0.5 * alpha) {
          // setActiveCategory(i)
          // setAngularOffset(-i * alpha)
          handleCategorySelect(i)
          onSettle(options[i])
          return
        }
      }
      // If we get to here and no cat has been settled on
      // Settle on the last as we assume it has gone past
      // setActiveCategory(categories.length - 1)
      // setAngularOffset(-(categories.length - 1) * alpha)
      handleCategorySelect(options.length - 1)
      onSettle(options.at(-1)!)
    },
    [options, onSettle]
  )

  const handleScroll = useCallback(
    (event: Event) => {
      console.log("scrolling")
      // Translates element scroll to angular scroll
      if (!scrollRef.current) return
      if (!shown) showCategories()
      if (settleTimeout) clearTimeout(settleTimeout) // Cancel any settling as we are still scrolling
      const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current
      const scrollRatio = scrollTop / (scrollHeight - offsetHeight)
      const angularOffset_ =
        angularSign[pos] * scrollRatio * (options.length - 1) * alpha
      setAngularOffset(-angularOffset_)
      settleTimeout = setTimeout(settleScroll, SETTLE_DELAY, angularOffset_)
    },
    [options, settleScroll]
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
  }, [settleScroll, options])

  const showCategories = () => {
    if (hideTimeout) clearTimeout(hideTimeout)
    setShown(true)
  }
  const hideCategories = () => {
    hideTimeout = setTimeout(() => {
      setShown(false)
    }, HIDE_DELAY)
  }

  return (
    <>
      <div className="absolute h-0 w-full">
        <div
          className={`top-3 ${rorl(pos)}-3
          absolute transition-transform aspect-square origin-center`}
          style={{
            transform: `rotateZ(${angularOffset}deg)`,
          }}
        >
          {options.map((category, i) => {
            const rotation = angularSign[pos] * i * alpha
            const translationY =
              angularSign[pos] * Math.sin((rotation * Math.PI) / 180) * rad
            const translationX =
              angularSign[pos] * Math.cos((rotation * Math.PI) / 180) * rad
            // const refProps =
            //   activeCategory === i ? { ref: activeCategoryRef } : {}
            return (
              <div
                key={category.value}
                className={clsx(
                  `${rorl(pos)}-0 origin-${rorl(pos)}`,
                  "absolute top-0 h-0 cursor-pointer transition-opacity duration-700",
                  shown || i === activeCategory
                    ? "opacity-1"
                    : "opacity-0 delay-200",
                  activeCategory === i && colour
                )}
                style={{
                  opacity: shown || i === activeCategory ? 1 : 0,
                  rotate: `${rotation}deg`,
                  translate: `${translationX}px ${translationY}px`,
                }}
                ref={categoriesRefs.current[i]}
              >
                <p
                  className={clsx(
                    "-translate-y-1/2",
                    activeCategory === i && colour
                  )}
                  onClick={(e) => handleTileClick(i)}
                  ref={categoriesRefs.current[i]}
                >
                  {category.label}
                </p>
              </div>
            )
          })}
        </div>
        {rorl(pos) === "left" ? (
          <div className="absolute w-full origin-left flex flex-col">
            <p
              className="transition-transform duration-1000 "
              style={{
                transform: `translateX(${
                  rad +
                  (categoriesRefs.current[activeCategory].current
                    ?.clientWidth || 30) +
                  12 + // for the top-3 and left-3
                  4 // for the space
                }px)`,
              }}
            >
              of a futile kind;
            </p>
            <p
              className={clsx(
                "w-full transition-opacity duration-700 text-gray-300 leading-none",
                shown ? "opacity-0" : "opacity-100 delay-500"
              )}
              style={{
                transform: `translateX(${rad + 12}px)`,
              }}
            >
              hailing from a troubled mind
            </p>
          </div>
        ) : null}
      </div>
      <div
        className={`absolute top-3 ${rorl(pos)}-3 ${
          angularSign[pos] === 1 ? "-" : ""
        }translate-x-1/2 -translate-y-1/2`}
      >
        <div
          className={`relative top-0 ${rorl(pos)}-0 aspect-square
            outline outline-1 overflow-hidden rounded-full peer
            transition-opacity duration-200  hover:opacity-100
            ${colour}`}
          style={{ width: `${2 * rad - 10}px` }}
        >
          <div
            className="absolute overflow-auto top-0 bottom-0 left-0 -right-32 h-full scroll-auto"
            ref={scrollRef}
            onMouseEnter={showCategories}
            onMouseLeave={hideCategories}
          >
            <div className="h-full" />
            {options.map((cat) => (
              <Fragment key={cat.value}>
                <div key={cat + "a"} className="h-full" />
                <div key={cat + "b"} className="h-full" />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(OrbitalMenu)
