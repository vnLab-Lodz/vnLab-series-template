import {
  useViewportScroll,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion"
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react"
import useHypothesis from "src/hooks/useHypothesis"
import useIsMobile from "src/hooks/useIsMobile"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import useScrollDirection, {
  SCROLL_DIRECTION,
} from "src/hooks/useScrollDirection"
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

      const theme = useTheme()
      const { hideHypothesis } = useHypothesis()
      const { setToggleNav, setIsVisible } = useNavMenuContext()
      const isMobile = useIsMobile()

      const { pauseScroll, resumeScroll } = useScrollPause({
        backgroundColor: theme.palette.light,
      })

      const { scrollYProgress } = useViewportScroll()
      const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])
      const progress = useMotionTemplate`${scrollPercent}%`

      const toggleMenu = () => setOpen(prev => !prev)

      const directionUp = useScrollDirection({ threshold: 300 })
      const directionDown = useScrollDirection({ threshold: 5 })

      useEffect(() => {
        if (!isMobile) {
          setIsVisible(true)
          return
        }

        if (!options.hideOnMobile || !independentHiding) return

        if (
          directionUp === SCROLL_DIRECTION.UP &&
          directionDown === SCROLL_DIRECTION.UP
        ) {
          setIsVisible(true)
        } else if (directionDown === SCROLL_DIRECTION.DOWN) {
          setIsVisible(false)
        }
      }, [
        directionUp,
        directionDown,
        options.hideOnMobile,
        independentHiding,
        isMobile,
      ])

      useEffect(
        () =>
          scrollYProgress.onChange(e => {
            if (e < 0.005) setIsVisible(true)
          }),
        []
      )

      useEffect(
        () =>
          setToggleNav(() => (state?: NAV_MENU_STATES) => {
            if (typeof state !== "undefined") setNavState(state)
            toggleMenu()
          }),
        []
      )

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
