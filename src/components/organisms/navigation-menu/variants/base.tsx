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

//@ts-ignore
import HamburgerSVG from "../../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../../images/icons/vnlab_logo.svg"
//@ts-ignore
import SearchSVG from "../../../../images/icons/magnifying_glass.svg"

const NavigationMenu: React.FC<
  NavVariantProps<{
    disableProgressText?: boolean
    disableThemeSwitching?: boolean
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
  const { disableProgressText = false, disableThemeSwitching = false } =
    renderProps

  const iconFilter = useMemo(() => {
    if (themeMode === THEME_MODES.DARK && open) return "invert(0)"
    else if (themeMode === THEME_MODES.LIGHT && open) return "invert(1)"

    return themeMode === THEME_MODES.DARK ? "invert(1)" : "none"
  }, [themeMode, open])

  const logoFilter = useMemo(
    () => (themeMode === THEME_MODES.DARK ? "invert(1)" : "none"),
    [themeMode]
  )

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
                  locale={locale}
                  aside={reduced}
                  disableThemeSwitching={disableThemeSwitching}
                />
              )}

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
