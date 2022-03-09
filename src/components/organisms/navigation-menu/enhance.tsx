import {
  useViewportScroll,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion"
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react"
import useHypothesis from "src/hooks/useHypothesis"
import useIsMobile from "src/hooks/useIsMobile"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import useScrollDistance from "src/hooks/useScrollDistance"
import useScrollPause from "src/hooks/useScrollPause"
import { useTheme } from "styled-components"
import { NAV_MENU_STATES } from "./types"

interface Options {
  hideOnMobile?: boolean
}

interface Props {
  currentPath: string
  reduced?: boolean
  ignoreHypothesis?: boolean
  independentHiding?: boolean
}

export interface NavVariantProps<P = {}> extends Props {
  open: boolean
  navState: NAV_MENU_STATES
  setNavState: Dispatch<SetStateAction<NAV_MENU_STATES>>
  toggleMenu: () => void
  progress: MotionValue<string>
  renderProps: P
}

export default function enhance<P = {}>(options: Options) {
  return (
      Component: React.ComponentType<NavVariantProps<P>>
    ): React.FC<Props & { renderProps?: P }> =>
    ({
      currentPath,
      reduced = false,
      ignoreHypothesis = false,
      independentHiding = false,
      renderProps = {} as P,
    }) => {
      const [open, setOpen] = useState(false)
      const [navState, setNavState] = useState<NAV_MENU_STATES>(
        NAV_MENU_STATES.TOC
      )

      const prevScrollPos = useRef<number | undefined>(undefined)

      const theme = useTheme()
      const { hideHypothesis } = useHypothesis()
      const { setToggleNav, setIsVisible } = useNavMenuContext()

      const isMobile = useIsMobile(mobile => {
        if (!options.hideOnMobile) return

        !mobile && setIsVisible(true)
      })

      const { pauseScroll, resumeScroll } = useScrollPause({
        backgroundColor: theme.palette.light,
      })

      const { scrollYProgress } = useViewportScroll()
      const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])
      const progress = useMotionTemplate`${scrollPercent}%`

      const toggleMenu = () => setOpen(prev => !prev)

      const onScroll = () => {
        if (!independentHiding) return

        const currentScrollPos = window.pageYOffset

        if (prevScrollPos.current !== undefined && isMobile) {
          if (open || prevScrollPos.current !== 0) {
            if (prevScrollPos.current < currentScrollPos) setIsVisible(false)
          }
        }

        prevScrollPos.current = currentScrollPos
      }

      const onScrollEnd = useScrollDistance(distance => {
        if (distance <= -300 && isMobile) setIsVisible(true)
      })

      useEffect(() => {
        if (!options.hideOnMobile) return

        window.addEventListener("scroll", onScroll)
        window.addEventListener("scroll", onScrollEnd)
        return () => {
          window.removeEventListener("scroll", onScroll)
          window.addEventListener("scroll", onScrollEnd)
        }
      }, [isMobile, setIsVisible])

      useEffect(() => setToggleNav(() => () => toggleMenu()), [])

      useLayoutEffect(() => {
        if (open) {
          pauseScroll()
          if (!ignoreHypothesis) hideHypothesis()
        } else {
          resumeScroll()
        }
      }, [open])

      return (
        <Component
          {...{
            open,
            navState,
            setNavState,
            toggleMenu,
            progress,
            currentPath,
            reduced,
            ignoreHypothesis,
            independentHiding,
            renderProps,
          }}
        />
      )
    }
}
