import React, { useState, useLayoutEffect, useEffect, useRef } from "react"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import { useLocalization } from "gatsby-theme-i18n"
import useHypothesis from "src/hooks/useHypothesis"
import useScrollPause from "src/hooks/useScrollPause"
import { useTheme } from "styled-components"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useTransform,
  useViewportScroll,
} from "framer-motion"
import useIsMobile from "src/hooks/useIsMobile"
import useScrollDistance from "src/hooks/useScrollDistance"
import MiscTabs from "./components/misc-tabs"
import NavMenuContent from "./components/content"
import { NAV_MENU_STATES } from "./types"

//@ts-ignore
import HamburgerSVG from "../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../images/icons/vnlab_logo.svg"
//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

interface Props {
  currentPath: string
  reduced?: boolean
  ignoreHypothesis?: boolean
  independentHiding?: boolean
}

const NavigationMenu: React.FC<Props> = ({
  currentPath,
  reduced = false,
  ignoreHypothesis = false,
  independentHiding = false,
}) => {
  const { navMode, setToggleNav, isVisible, setIsVisible } = useNavMenuContext()
  const [open, setOpen] = useState(false)
  const [navState, setNavState] = useState<NAV_MENU_STATES>(NAV_MENU_STATES.TOC)
  const { locale } = useLocalization()
  const { hideHypothesis } = useHypothesis()
  const { t } = useTranslation(["common", "nav-menu"])
  const prevScrollPos = useRef<number | undefined>(undefined)
  const isMobile = useIsMobile(mobile => !mobile && setIsVisible(true))

  const theme = useTheme()
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
    <AnimatePresence initial={false} exitBeforeEnter>
      {isVisible && (
        <Styled.Aside
          noConstraint
          open={open}
          as={motion.div}
          initial={{ translateY: -125, opacity: 0 }}
          animate={{
            translateY: 0,
            opacity: 1,
            transition: { duration: 0.25, ease: "easeInOut" },
          }}
          exit={{
            translateY: -125,
            opacity: 0,
            transition: { delay: 0.25, duration: 0.3, ease: "easeInOut" },
          }}
        >
          <Styled.Nav mode={navMode} id="menu-nav">
            <Styled.Progress style={{ height: progress, width: progress }} />
            <Styled.ToggleBtn mode={navMode} open={open} onClick={toggleMenu}>
              <img
                className="sizeable-icon"
                src={open ? CloseSVG : HamburgerSVG}
                alt="Toggle Menu Button"
              />
            </Styled.ToggleBtn>
            {!reduced ? (
              <Styled.Title to="/" language={locale}>
                {t("common:title")}
              </Styled.Title>
            ) : (
              <MiscTabs
                currentPath={currentPath}
                locale={locale}
                aside={reduced}
              />
            )}

            <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
          </Styled.Nav>
          <NavMenuContent
            open={open}
            navState={navState}
            setNavState={setNavState}
            currentPath={currentPath}
          />
        </Styled.Aside>
      )}
    </AnimatePresence>
  )
}

export default NavigationMenu
