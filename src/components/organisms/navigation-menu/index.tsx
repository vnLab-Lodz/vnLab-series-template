import React, { useContext, useState } from "react"
import { NavMenuContext } from "./nav-menu-context"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
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
import { useLocalization } from "gatsby-theme-i18n"
import TableOfContents from "./tabs/toc"

enum NAV_MENU_STATES {
  TOC,
  INDEXES,
  ABOUT,
}

function getLocalesString(config: Array<{ code: string }>) {
  return config.reduce((prev: string, { code }, index) => {
    if (index === 0) return code.toUpperCase()

    return (prev += `/${code.toUpperCase()}`)
  }, "")
}

const NavigationMenu: React.FC = () => {
  const { navMode } = useContext(NavMenuContext)
  const [open, setOpen] = useState(false)
  const [navState, setNavState] = useState<NAV_MENU_STATES>(NAV_MENU_STATES.TOC)
  const { t } = useTranslation(["common", "nav-menu"])

  const { config } = useLocalization()
  const locales = getLocalesString(config)

  const { scrollYProgress } = useViewportScroll()
  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])
  const progress = useMotionTemplate`${scrollPercent}%`

  const toggleMenu = () => setOpen(prev => !prev)

  const getActiveTab = () => {
    let tab = <></>

    switch (navState) {
      case NAV_MENU_STATES.TOC:
        tab = <TableOfContents />
        break
      case NAV_MENU_STATES.INDEXES:
        break
      case NAV_MENU_STATES.ABOUT:
        break
      default:
        break
    }

    return tab
  }

  return (
    <Styled.Aside>
      <Styled.Nav mode={navMode}>
        <Styled.Progress style={{ height: progress, width: progress }} />
        <Styled.ToggleBtn open={open} onClick={toggleMenu}>
          <img src={open ? CloseSVG : HamburgerSVG} alt="Toggle Menu Button" />
        </Styled.ToggleBtn>
        <Styled.Title>{t("common:title")}</Styled.Title>
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
                <Styled.TabButton>
                  <Styled.TabButtonText>{locales}</Styled.TabButtonText>
                </Styled.TabButton>
                <Styled.TabButton>
                  <Styled.SearchImg src={SearchSVG} alt="Magnifying glass" />
                </Styled.TabButton>
              </Styled.TabItems>
            </Styled.Tabs>
            {getActiveTab()}
          </Styled.NavMenuContent>
        )}
      </AnimatePresence>
    </Styled.Aside>
  )
}

export default NavigationMenu
