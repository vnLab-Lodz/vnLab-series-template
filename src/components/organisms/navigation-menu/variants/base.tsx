import React, { useEffect, useMemo, useState } from "react"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { useTranslation } from "react-i18next"
import * as Styled from "../style"
import { useLocalization } from "gatsby-theme-i18n"
import { AnimatePresence, motion, MotionValue } from "framer-motion"
import MiscTabs from "../components/misc-tabs"
import NavMenuContent from "../components/content"
import enhance, { NavVariantProps } from "../enhance"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"

import HamburgerSVG from "../../../../images/icons/hamburger.svg"
import CloseSVG from "../../../../images/icons/x.svg"
import VnlabLogo from "../../../../images/icons/vnlab_logo.svg"
import ExpandArrow from "src/images/icons/arrow_expand.svg"
import { NAV_MODES } from "../nav-menu-context"
import {
  isMobileOrTablet,
  isSafari,
  isStandalone,
} from "~components/molecules/fullscreen-dialog"

const NavigationMenu: React.FC<
  NavVariantProps<{
    disableProgressText?: boolean
    disableThemeSwitching?: boolean
    enableFullscreen?: boolean
  }>
> = ({
  currentPath,
  reduced,
  navState,
  progress,
  toggleMenu,
  open,
  setNavState,
  renderProps,
}) => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "nav-menu"])
  const { isVisible, navMode } = useNavMenuContext()
  const { themeMode } = useThemeSwitcherContext()
  const {
    disableProgressText = false,
    disableThemeSwitching = false,
    enableFullscreen = false,
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
      <Styled.MobileProgress style={{ height: progress, width: progress }} />
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
            <Styled.Nav mode={navMode} id="menu-nav">
              <Styled.Progress style={{ height: progress, width: progress }} />
              <ProgressText
                progress={progress}
                disableProgressText={disableProgressText}
              />
              <Styled.ToggleBtn mode={navMode} open={open} onClick={toggleMenu}>
                <img
                  className="sizeable-icon"
                  src={open ? CloseSVG : HamburgerSVG}
                  alt="Toggle Menu Button"
                  style={{ filter: iconFilter }}
                />
              </Styled.ToggleBtn>
              {!reduced ? (
                <Styled.Title to="/" language={locale}>
                  {t("common:title")}
                </Styled.Title>
              ) : (
                <MiscTabs
                  currentPath={currentPath}
                  aside={reduced}
                  disableThemeSwitching={disableThemeSwitching}
                />
              )}
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
  disableProgressText?: boolean
  disableThemeSwitching?: boolean
  enableFullscreen?: boolean
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
