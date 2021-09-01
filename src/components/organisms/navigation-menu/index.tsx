import React, { useContext, useState, useLayoutEffect } from "react"
import { NavMenuContext } from "./nav-menu-context"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import LanguagePicker from "~components/molecules/language-picker"
import useHypothesis from "src/hooks/useHypothesis"
import TableOfContents from "./tabs/toc"
import Indexes from "./tabs/indexes"
import About from "./tabs/about"
import {
  AnimatePresence,
  useMotionTemplate,
  useTransform,
  useViewportScroll,
} from "framer-motion"

//@ts-ignore
import HamburgerSVG from "../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../images/icons/vnlab_logo.svg"
//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

enum NAV_MENU_STATES {
  TOC,
  INDEXES,
  ABOUT,
}

interface Props {
  currentPath: string
}

const ActiveTab: React.FC<{ navState: NAV_MENU_STATES }> = ({ navState }) => {
  switch (navState) {
    case NAV_MENU_STATES.TOC:
      return <TableOfContents />
    case NAV_MENU_STATES.INDEXES:
      return <Indexes />
    case NAV_MENU_STATES.ABOUT:
      return <About />
    default:
      return <></>
  }
}

const NavigationMenu: React.FC<Props> = ({ currentPath }) => {
  const { navMode } = useContext(NavMenuContext)
  const [open, setOpen] = useState(false)
  const [navState, setNavState] = useState<NAV_MENU_STATES>(NAV_MENU_STATES.TOC)
  const { locale } = useLocalization()
  const hypothesis = useHypothesis()
  const { t } = useTranslation(["common", "nav-menu"])

  const { scrollYProgress } = useViewportScroll()
  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])
  const progress = useMotionTemplate`${scrollPercent}%`

  const toggleMenu = () => setOpen(prev => !prev)

  useLayoutEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll")
      hypothesis?.classList.add("invisible")
    }

    return () => {
      document.body.classList.remove("no-scroll")
      hypothesis?.classList.remove("invisible")
    }
  }, [open])

  return (
    <Styled.Aside>
      <Styled.Nav mode={navMode}>
        <Styled.Progress style={{ height: progress, width: progress }} />
        <Styled.ToggleBtn mode={navMode} open={open} onClick={toggleMenu}>
          <img src={open ? CloseSVG : HamburgerSVG} alt="Toggle Menu Button" />
        </Styled.ToggleBtn>
        <Styled.Title to="/" language={locale}>
          {t("common:title")}
        </Styled.Title>
        <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
      </Styled.Nav>
      <AnimatePresence>
        {open && (
          <Styled.NavMenuContent
            initial={{ translateX: -1500 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -1500 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Styled.Tabs>
              <Styled.TabItems>
                <Styled.TabButton
                  onClick={() => setNavState(NAV_MENU_STATES.TOC)}
                >
                  <Styled.TabButtonText
                    active={navState === NAV_MENU_STATES.TOC}
                  >
                    {t("nav-menu:tabs.toc")}
                  </Styled.TabButtonText>
                </Styled.TabButton>
                <Styled.TabButton
                  onClick={() => setNavState(NAV_MENU_STATES.INDEXES)}
                >
                  <Styled.TabButtonText
                    active={navState === NAV_MENU_STATES.INDEXES}
                  >
                    {t("nav-menu:tabs.indexes")}
                  </Styled.TabButtonText>
                </Styled.TabButton>
                <Styled.TabButton
                  onClick={() => setNavState(NAV_MENU_STATES.ABOUT)}
                >
                  <Styled.TabButtonText
                    active={navState === NAV_MENU_STATES.ABOUT}
                  >
                    {t("nav-menu:tabs.about")}
                  </Styled.TabButtonText>
                </Styled.TabButton>
              </Styled.TabItems>
              <Styled.TabItems noFlex>
                <LanguagePicker currentPath={currentPath} />
                <Styled.TabButton>
                  <LocalizedLink to="/search" language={locale}>
                    <Styled.SearchImg src={SearchSVG} alt="Magnifying glass" />
                  </LocalizedLink>
                </Styled.TabButton>
              </Styled.TabItems>
            </Styled.Tabs>
            <ActiveTab navState={navState} />
          </Styled.NavMenuContent>
        )}
      </AnimatePresence>
    </Styled.Aside>
  )
}

export default NavigationMenu
