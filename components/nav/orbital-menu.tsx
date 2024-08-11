"use client"
import { IconChevronUp } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import {
  Fragment,
  Ref,
  createRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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

type MenuOptionCore = {
  label: string
  id: string
  className?: string
  isTitle?: boolean
  action?: string
  href?: string
}

export type OrbitalMenuOption = MenuOptionCore

type OrbitalMenuProps = {
  titleOption?: string
  options: OrbitalMenuOption[]
  onSettle: (_: OrbitalMenuOption) => void
  colour: string
  pos?: "tr" | "tl" | "br" | "bl"
  rad?: number
  alpha?: number
  thickness?: number
  fill?: boolean
  showOffscreenIndicators?: boolean
}

export type OrbitalMenuHandle = {
  home: () => void
  to: (_: number) => void
}

const OrbitalMenu = (
  {
    titleOption,
    options: options_,
    onSettle,
    colour,
    pos = "tl",
    rad = R,
    alpha = ALPHA,
    thickness = 1,
    fill = false,
    showOffscreenIndicators = true,
  }: OrbitalMenuProps,
  ref: Ref<OrbitalMenuHandle>
) => {
  // If this updates bad things happen. That is why deps are omitted
  const options = useMemo(
    () =>
      titleOption
        ? [{ label: titleOption, id: "____", isTitle: true }, ...options_]
        : options_,
    []
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const categoriesRefs = useRef(options.map((c) => createRef<HTMLDivElement>()))
  const hideTimeout = useRef<null | NodeJS.Timeout>()
  const settleTimeout = useRef<null | NodeJS.Timeout>()
  const [activeOption, setActiveOption] = useState(0)
  const [angularOffset, setAngularOffset] = useState(0)
  const [shown, setShown] = useState(false)
  // lkeeps track of which offscreen indicator (arrow) to show
  // first one is start (direction of title option)
  const [offscreenIndicator, setOffscreenIndicator] = useState([false, false])

  useImperativeHandle(
    ref,
    () => {
      return {
        home() {
          // clear the indicator since can't be anything beyond
          if (showOffscreenIndicators)
            setOffscreenIndicator((curr) => [false, curr[1]])
          handleCategorySelect(0)
          setShown(false)
        },
        to(idx: number) {
          // if not going to title option, add start indicator
          if (
            showOffscreenIndicators &&
            (idx > 0 || (titleOption && idx === 0))
          )
            setOffscreenIndicator((curr) => [true, curr[1]])
          handleCategorySelect(idx + 1)
        },
      }
    },
    []
  )

  const handleCategorySelect = (categoryIndex: number) => {
    console.log(titleOption, ": Setting category", categoryIndex)
    // Sets the active category and syncs scrolls to it
    // Used by both methods of selection: settle and click
    setActiveOption(categoryIndex)
    // So that they all hide at once (see conditional classes
    // below) we clear timeout and hide from now so it is set
    // at same time as active category

    // SYNC scrolls to category
    if (!scrollRef.current) return
    const { scrollHeight, offsetHeight } = scrollRef.current
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
    console.log(titleOption, ": clearing hide timeout from category set")
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setShown(false)
  }

  const handleTileClick = (optnIdx: number) => {
    // Sets the tile thats clicked and moves the orbit there
    // Sets the exact scroll amount as well to keep in sync
    // with angular offset
    // setAngularOffset(-tileIdx * alpha)
    // setActiveCategory(tileIdx)
    // console.log(titleOption, "Calling categorySelect from handleTileClick()")
    handleCategorySelect(optnIdx)
    // make sure it isnt the title and it is an action option (not href)
    if (!options[optnIdx].isTitle && options[optnIdx].action)
      // skip setting if home option
      onSettle(options[optnIdx])

    // If there is a scroll settle timeout waiting, clear it
    if (settleTimeout.current) clearTimeout(settleTimeout.current)
  }

  const settleScroll = useCallback(
    (offset: number) => {
      console.log(titleOption, ": settling scroll")
      // Find closest option by seeing if the diff btwn
      // current angle and the angle of an option is smaller
      // than half of ALHPA
      for (let i = 0; i < options.length; i++) {
        if (Math.abs(i * alpha - angularSign[pos] * offset) <= 0.5 * alpha) {
          // setActiveCategory(i)
          // setAngularOffset(-i * alpha)
          // console.log(titleOption, "Calling categorySelect from settleScroll 1")
          handleCategorySelect(i)
          if (!options[i].isTitle)
            // skip setting if home option
            onSettle(options[i])
          return
        }
      }
      // If we get to here and no cat has been settled on
      // Settle on the last as we assume it has gone past
      // setActiveCategory(categories.length - 1)
      // setAngularOffset(-(categories.length - 1) * alpha)
      // console.log(titleOption, "Calling categorySelect from settleScroll 2")
      handleCategorySelect(options.length - 1)
      onSettle(options.at(-1)!)
    },
    [options, onSettle]
  )

  const determineOffscreen = (angularOffset: number) => {
    if (!showOffscreenIndicators) return
    // if angular offset is (approx) 0, nothing is offscreen in start direction
    // otherwise it is, as soon as there is angular offset, options start to go offscreen
    if (Math.round(angularOffset * 100) == 0)
      setOffscreenIndicator((curr) => [false, curr[1]])
    else setOffscreenIndicator((curr) => [true, curr[1]])
    // If the total angular range of options is bigger than 90 degrees,
    // taking into account the angular offset, then options will be offscreen
    if ((options.length - 1) * alpha - Math.abs(angularOffset) > 90)
      setOffscreenIndicator((curr) => [curr[0], true])
    else setOffscreenIndicator((curr) => [curr[0], false])
  }

  const handleScroll = useCallback(
    (event: Event) => {
      console.log(titleOption, ": handleScroll()")
      // Translates element scroll to angular scroll
      if (!scrollRef.current) return
      if (!shown) showCategories()
      if (settleTimeout.current) clearTimeout(settleTimeout.current) // Cancel any settling as we are still scrolling
      const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current
      const scrollRatio = Math.abs(
        oneorzero[pos] - scrollTop / (scrollHeight - offsetHeight)
      )
      const angularOffset_ =
        angularSign[pos] * scrollRatio * (options.length - 1) * alpha
      setAngularOffset(-angularOffset_)
      console.log(titleOption, ": Setting settle timeoit")
      settleTimeout.current = setTimeout(
        settleScroll,
        SETTLE_DELAY,
        angularOffset_
      )

      // show or hide offscreen indicators
      determineOffscreen(angularOffset_)
    },
    [alpha, options.length, pos, settleScroll, shown, titleOption]
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
    // show or hide offscreen indicators initially
    determineOffscreen(angularOffset)

    return () => {
      ref?.removeEventListener("scroll", handleScroll)
    }
  }, [settleScroll, options])

  const showCategories = useCallback(() => {
    console.log(titleOption, ": clearing hide timeout from show")
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setShown(true)
  }, [])

  const hideCategories = () => {
    console.log(titleOption, ": setting hide timeout")
    hideTimeout.current = setTimeout(() => {
      setShown(false)
    }, HIDE_DELAY)
  }

  return (
    <>
      <div className="absolute h-full w-full pointer-events-none">
        {showOffscreenIndicators ? (
          <>
            <IconChevronUp
              className={clsx(
                "z-10 absolute w-4 h-4 transition-opacity duration-200 text-text",
                offscreenIndicator[0] && shown ? "opacity-100" : "opacity-0",
                `${torb[pos]}-0`,
                `${pormx[pos]}translate-x-full ${
                  torb[pos] === "bottom" ? "rotate-180" : ""
                }`
              )}
              style={
                rorl[pos] === "right"
                  ? { right: `${rad}px` }
                  : { left: `${rad}px` }
              }
            />
            <IconChevronUp
              className={clsx(
                "z-10 absolute w-4 h-4 transition-opacity duration-200 text-text",
                offscreenIndicator[1] && shown ? "opacity-100" : "opacity-0",
                `${rorl[pos]}-0`,
                `${pormy[pos]}translate-y-full ${pormx[pos]}rotate-90`
              )}
              style={
                torb[pos] === "top"
                  ? { top: `${rad}px` }
                  : { bottom: `${rad}px` }
              }
            />
          </>
        ) : null}
        <div
          className={`${torb[pos]}-3 ${rorl[pos]}-3 pointer-events-auto
          absolute transition-transform aspect-square origin-center z-10`}
          style={{
            transform: `rotateZ(${angularOffset}deg)`,
          }}
        >
          {options.map((option, i) => {
            const rotation = angularSign[pos] * i * alpha
            const translationY =
              aorb[pos] * Math.sin((rotation * Math.PI) / 180) * rad
            const translationX =
              bora[pos] * Math.cos((rotation * Math.PI) / 180) * rad
            // const refProps =
            //   activeCategory === i ? { ref: activeCategoryRef } : {}
            return (
              <div
                key={option.id}
                className={clsx(
                  `${torb[pos]}-0 ${rorl[pos]}-0 origin-${origin[pos]}`,
                  "absolute h-0 cursor-pointer transition-opacity duration-700",
                  shown || i === activeOption ? "opacity-100" : "opacity-0",
                  activeOption === i && `text-${colour}`
                )}
                style={{
                  // opacity: shown || i === activeOption ? 1 : 0,
                  rotate: `${rotation}deg`,
                  translate: `${translationX}px ${translationY}px`,
                }}
                ref={categoriesRefs.current[i]}
              >
                {option.href ? (
                  <Link
                    href={option.href}
                    className={clsx(
                      "-translate-y-1/2 whitespace-nowrap block",
                      shown && !option.isTitle
                        ? "pointer-events-auto"
                        : "pointer-events-none",
                      activeOption === i && `text-${colour}`,
                      option.className || ""
                      // category.value === "__" && "text-dim"
                    )}
                    onClick={(e) => handleTileClick(i)}
                    ref={categoriesRefs.current[i] as any}
                  >
                    {option.label}
                  </Link>
                ) : (
                  <p
                    className={clsx(
                      "-translate-y-1/2 whitespace-nowrap",
                      shown && !option.isTitle
                        ? "pointer-events-auto"
                        : "pointer-events-none",
                      activeOption === i && `text-${colour}`,
                      option.className || ""
                      // category.value === "__" && "text-dim"
                    )}
                    onClick={(e) => handleTileClick(i)}
                    ref={categoriesRefs.current[i]}
                  >
                    {option.label}
                  </p>
                )}
              </div>
            )
          })}
        </div>
        {pos === "tl" ? (
          <div
            className={clsx(
              "absolute origin-left flex flex-col transition-opacity duration-300",
              options[activeOption].isTitle ? "opacity-0" : "opacity-100"
            )}
          >
            <p
              className="transition-transform duration-1000 "
              style={{
                transform: `translateX(${
                  rad +
                  (categoriesRefs.current[activeOption].current?.clientWidth ||
                    30) +
                  12 + // for the top-3 and left-3
                  4 // for the space
                }px)`,
              }}
            >
              of a futile kind;
            </p>
            <p
              className={clsx(
                "transition-opacity duration-700 text-dim leading-none",
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
        ${pormx[pos]}translate-x-1/2 ${pormy[pos]}translate-y-1/2
        pointer-events-auto`}
      >
        {/* This is the backdrop to increase visibility of menu options when drawn over text */}
        <div
          className={clsx(
            `absolute ${pormy[pos]}${torb[pos]}-0 ${pormx[pos]}${rorl[pos]}-0 ${pormx[pos]}translate-x-1/4 ${pormy[pos]}translate-y-1/4 pointer-events-none`,
            "-z-10 aspect-square rounded-full scale-0 transition-transform duration-300",
            "bg-gradient-radial from-sec via-sec via-50% to-transparent",
            shown ? "scale-100" : ""
          )}
          style={{
            width: `${5 * rad - 10}px`,
            outlineWidth: thickness + "px",
          }}
        ></div>
        <div
          className={clsx(
            `relative ${torb[pos]}-0 ${rorl[pos]}-0`,
            "aspect-square outline overflow-hidden rounded-full peer transition-opacity duration-200  hover:opacity-100",
            `text-${colour}`,
            activeOption && fill ? `bg-${colour}` : ""
          )}
          style={{ width: `${2 * rad - 10}px`, outlineWidth: thickness + "px" }}
        >
          {/* This is what allows natural scrolling, amount of scroll is proportional to options length */}
          <div
            className="absolute overflow-auto top-0 bottom-0 left-0 -right-32 h-full scroll-auto"
            ref={scrollRef}
            onMouseEnter={showCategories}
            onMouseLeave={hideCategories}
          >
            <div className="h-full" />
            {options.map((opt) => (
              <Fragment key={opt.id}>
                <div key={opt + "a"} className="h-full" />
                <div key={opt + "b"} className="h-full" />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(
  forwardRef<OrbitalMenuHandle, OrbitalMenuProps>(OrbitalMenu)
)
