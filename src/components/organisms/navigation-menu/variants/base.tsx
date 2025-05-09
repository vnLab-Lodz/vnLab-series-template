import React, { useEffect, useMemo, useState } from "react"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import * as Styled from "../style"
import { useLocalization } from "gatsby-theme-i18n"
import { AnimatePresence, motion, MotionValue } from "framer-motion"
import NavMenuContent from "../components/content"
import enhance, { NavVariantProps } from "../enhance"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import config from "publication/publication.config.json"
import { NAV_MODES } from "../nav-menu-context"
import {
  isMobileOrTablet,
  isSafari,
  isStandalone,
} from "~components/molecules/fullscreen-dialog"
import { LangKey } from "~types/config"

import HamburgerSVG from "../../../../images/icons/hamburger.svg"
import CloseSVG from "../../../../images/icons/x.svg"
import VnlabLogo from "../../../../images/icons/vnlab_logo.svg"
import ExpandArrow from "src/images/icons/arrow_expand.svg"

const NavigationMenu: React.FC<
  NavVariantProps<{
    disableProgress?: boolean
    disableProgressText?: boolean
    disableThemeSwitching?: boolean
    enableFullscreen?: boolean
    constantColours?: boolean
  }>
> = ({
  currentPath,
  navState,
  progress,
  toggleMenu,
  open,
  setNavState,
  renderProps,
}) => {
  const { locale } = useLocalization()
  const { isVisible, navMode } = useNavMenuContext()
  const { themeMode } = useThemeSwitcherContext()
  // @ts-ignore - it's an optional property on json schema
  const isThemeDefinedInConfig = config.theme ? true : false
  const {
    disableProgress = false,
    disableProgressText = false,
    disableThemeSwitching = isThemeDefinedInConfig,
    enableFullscreen = false,
    constantColours = false,
  } = renderProps

  const hasFullscreenButton =
    enableFullscreen && !isSafari() && isMobileOrTablet() && !isStandalone()

  const iconFilter = useMemo(() => {
    if (themeMode === THEME_MODES.DARK && open) return "invert(0)"
    else if (themeMode === THEME_MODES.LIGHT && open) return "invert(1)"

    return themeMode === THEME_MODES.DARK ? "invert(1)" : "none"
  }, [themeMode, open])

  const logoFilter = useMemo(
    () => (themeMode === THEME_MODES.DARK ? "invert(1)" : "none"),
    [themeMode]
  )

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return (
    <>
      {!disableProgress ? (
        <Styled.MobileProgress style={{ height: progress, width: progress }} />
      ) : null}
      <AnimatePresence initial={false} exitBeforeEnter>
        {isVisible && (
          <Styled.Aside
            $noConstraint
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
            <Styled.Nav
              mode={navMode}
              $open={open || constantColours}
              id="menu-nav"
            >
              {!open ? (
                <>
                  <Styled.Progress
                    style={{ height: progress, width: progress }}
                  />
                  <ProgressText
                    progress={progress}
                    disableProgressText={disableProgressText}
                  />
                </>
              ) : null}
              <Styled.ToggleBtn mode={navMode} open={open} onClick={toggleMenu}>
                <img
                  className="sizeable-icon"
                  src={open ? CloseSVG : HamburgerSVG}
                  alt="Toggle Menu Button"
                  style={{ filter: iconFilter }}
                />
              </Styled.ToggleBtn>
              <Styled.Title to="/" language={locale}>
                {config[locale as LangKey].title}
              </Styled.Title>
              {hasFullscreenButton ? (
                <Styled.ToggleBtn
                  style={{ marginLeft: "auto" }}
                  mode={NAV_MODES.PERMANENT}
                  open={false}
                  onClick={toggleFullscreen}
                >
                  <img
                    className="sizeable-icon"
                    src={ExpandArrow}
                    alt="Toggle Fullscreen"
                    style={{ filter: "invert(1)" }}
                  />
                </Styled.ToggleBtn>
              ) : null}
              <Styled.Logo
                src={VnlabLogo}
                alt="vnLab logo"
                style={{ filter: logoFilter }}
              />
            </Styled.Nav>
            <NavMenuContent
              open={open}
              navState={navState}
              setNavState={setNavState}
              currentPath={currentPath}
              disableThemeSwitching={disableThemeSwitching}
            />
          </Styled.Aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default enhance<{
  disableProgress?: boolean
  disableProgressText?: boolean
  disableThemeSwitching?: boolean
  enableFullscreen?: boolean
  constantColours?: boolean
}>({
  hideOnMobile: true,
})(NavigationMenu)

const ProgressText: React.FC<{
  disableProgressText?: boolean
  progress: MotionValue<string>
}> = ({ progress, disableProgressText }) => {
  const [progressText, setProgressText] = useState("")

  useEffect(() =>
    progress.onChange(value => {
      setProgressText(`${Math.ceil(Number(value.replace("%", "")))}%`)
    })
  )

  if (disableProgressText) return null

  return (
    <Styled.ProgressText style={{ top: progress }}>
      {progressText}
    </Styled.ProgressText>
  )
}
