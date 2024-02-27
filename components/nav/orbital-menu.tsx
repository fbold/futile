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

// What multiplier for angular position
const angularSign = {
  tr: -1,
  tl: 1,
  br: 1,
  bl: -1,
}

// If the vertical scroll is mapped directly or inversely
// when set to zero its ratio will be directly proportional to angular scroll
// opposite for 1 like so: Math.abs(oneorzero[pos] - ratio)
const oneorzero = {
  tr: 0,
  tl: 0,
  br: 1,
  bl: 1,
}

// before or after
// whether the options appear above or below the vertical diameter line
const bora = {
  tr: -1,
  tl: 1,
  br: -1,
  bl: 1,
}

// above or below
// whether the options appear above or below the horizontal diameter line
const aorb = {
  tr: -1,
  tl: 1,
  br: -1,
  bl: 1,
}

const pormx = {
  tr: "",
  tl: "-",
  br: "",
  bl: "-",
}

const pormy = {
  tr: "-",
  tl: "-",
  br: "",
  bl: "",
}

const origin = {
  tr: "right",
  tl: "left",
  br: "right",
  bl: "left",
}

const rorl = {
  tr: "right",
  tl: "left",
  br: "right",
  bl: "left",
}

const torb = {
  tr: "top",
  tl: "top",
  br: "bottom",
  bl: "bottom",
}

export type OrbitalMenuOption = {
  value: string
  label: string
}

type OrbitalMenuProps = {
  options: OrbitalMenuOption[]
  onSettle: (_: OrbitalMenuOption) => void
  colour: string
  pos?: "tr" | "tl" | "br" | "bl"
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
    const scrollRatio = Math.abs(
      oneorzero[pos] - categoryIndex / (options.length - 1)
    )
    const scrollAmount = scrollRatio * (scrollHeight - offsetHeight)
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
      const scrollRatio = Math.abs(
        oneorzero[pos] - scrollTop / (scrollHeight - offsetHeight)
      )
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
    scrollRef.current.scrollTo({
      behavior: "instant",
      top:
        oneorzero[pos] * scrollRef.current.scrollHeight -
        scrollRef.current.offsetHeight,
    })
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
      <div className="absolute h-full w-full pointer-events-none">
        <div
          className={`${torb[pos]}-3 ${rorl[pos]}-3
          absolute transition-transform aspect-square origin-center`}
          style={{
            transform: `rotateZ(${angularOffset}deg)`,
          }}
        >
          {options.map((category, i) => {
            const rotation = angularSign[pos] * i * alpha
            const translationY =
              aorb[pos] * Math.sin((rotation * Math.PI) / 180) * rad
            const translationX =
              bora[pos] * Math.cos((rotation * Math.PI) / 180) * rad
            // const refProps =
            //   activeCategory === i ? { ref: activeCategoryRef } : {}
            return (
              <div
                key={category.value}
                className={clsx(
                  `${torb[pos]}-0 ${rorl[pos]}-0 origin-${origin[pos]}`,
                  "absolute h-0 cursor-pointer transition-opacity duration-700",
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
                    "-translate-y-1/2 pointer-events-auto",
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
        {pos === "tl" ? (
          <div className="absolute origin-left flex flex-col">
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
                "transition-opacity duration-700 text-gray-300 leading-none",
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
        className={`absolute ${torb[pos]}-3 ${rorl[pos]}-3 
        ${pormx[pos]}translate-x-1/2 ${pormy[pos]}translate-y-1/2`}
      >
        <div
          className={`relative ${torb[pos]}-0 ${rorl[pos]}-0 aspect-square
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