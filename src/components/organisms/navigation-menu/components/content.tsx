import React, { useEffect } from "react"
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
import { useTags } from "../tabs/indexes"

interface Props {
  currentPath: string
  open: boolean
  navState: NAV_MENU_STATES
  setNavState: React.Dispatch<React.SetStateAction<NAV_MENU_STATES>>
  disableThemeSwitching?: boolean
  bg?: boolean
}

const NavMenuContent: React.FC<Props> = ({
  open,
  currentPath,
  navState,
  setNavState,
  disableThemeSwitching = false,
  bg = false,
}) => {
  const { t } = useTranslation(["common", "nav-menu"])
  const { locale, localizedPath, defaultLang, prefixDefault } =
    useLocalization()

  const tags = useTags()

  useEffect(() => {
    const el = document.getElementById("nav-menu-content")
    if (!el) return

    el.scrollTo({ top: 0, behavior: "auto" })
  }, [navState])

  return (
    <AnimatePresence>
      {open && (
        <Styled.NavMenuContent
          id="nav-menu-content"
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
              {tags.length > 0 ? (
                <Styled.TabButton
                  onClick={() => setNavState(NAV_MENU_STATES.INDEXES)}
                >
                  <Styled.TabButtonText
                    active={navState === NAV_MENU_STATES.INDEXES}
                  >
                    {t("nav-menu:tabs.indexes")}
                  </Styled.TabButtonText>
                </Styled.TabButton>
              ) : null}
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
            <MiscTabs
              Wrapper={Styled.TabItems}
              wrapperProps={{ noFlex: true }}
              currentPath={currentPath}
              disableThemeSwitching={disableThemeSwitching}
            />
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
