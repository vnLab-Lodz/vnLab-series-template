import React from "react"
import { AnimatePresence } from "framer-motion"
import { useLocalization } from "gatsby-theme-i18n"
import { navigate } from "gatsby"
import * as Styled from "../style"
import { NAV_MENU_STATES } from "../types"
import MiscTabs from "./misc-tabs"
import ActiveTab from "./active-tab"
import NextTab from "./next-tab"
import { useTranslation } from "react-i18next"
import lightTheme from "~styles/theme"
import { ThemeProvider } from "styled-components"

interface Props {
  currentPath: string
  open: boolean
  navState: NAV_MENU_STATES
  setNavState: React.Dispatch<React.SetStateAction<NAV_MENU_STATES>>
}

const NavMenuContent: React.FC<Props> = ({
  open,
  currentPath,
  navState,
  setNavState,
}) => {
  const { t } = useTranslation(["common", "nav-menu"])
  const { locale, localizedPath, defaultLang, prefixDefault } =
    useLocalization()

  return (
    <AnimatePresence>
      {open && (
        <Styled.NavMenuContent
          initial={{ translateX: -1500 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -1500 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Styled.Tabs sticky>
            <Styled.TabItems>
              <Styled.TabButton
                onClick={() => setNavState(NAV_MENU_STATES.TOC)}
              >
                <Styled.TabButtonText active={navState === NAV_MENU_STATES.TOC}>
                  {t("nav-menu:tabs.toc")}
                </Styled.TabButtonText>
              </Styled.TabButton>
              {/* // ! Temporarily disabled */}
              {/* <Styled.TabButton
                onClick={() => setNavState(NAV_MENU_STATES.INDEXES)}
              >
                <Styled.TabButtonText
                  active={navState === NAV_MENU_STATES.INDEXES}
                >
                  {t("nav-menu:tabs.indexes")}
                </Styled.TabButtonText>
              </Styled.TabButton> */}
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
              <MiscTabs currentPath={currentPath} locale={locale} />
            </Styled.TabItems>
          </Styled.Tabs>
          <ActiveTab navState={navState} />
          <NextTab navState={navState} setNavState={setNavState} />
          <ThemeProvider theme={lightTheme}>
            <Styled.AnnotationsButton
              onClick={() =>
                navigate(
                  localizedPath({
                    locale,
                    prefixDefault,
                    defaultLang,
                    path: "/hypothesis_tutorial",
                  })
                )
              }
            >
              {t("nav-menu:how_to_annotate")}
            </Styled.AnnotationsButton>
          </ThemeProvider>
        </Styled.NavMenuContent>
      )}
    </AnimatePresence>
  )
}

export default NavMenuContent
