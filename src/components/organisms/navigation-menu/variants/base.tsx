import React from "react"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { useTranslation } from "react-i18next"
import * as Styled from "../style"
import { useLocalization } from "gatsby-theme-i18n"
import { AnimatePresence, motion } from "framer-motion"
import MiscTabs from "../components/misc-tabs"
import NavMenuContent from "../components/content"
import enhance, { NavVariantProps } from "../enhance"

//@ts-ignore
import HamburgerSVG from "../../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../../images/icons/vnlab_logo.svg"
//@ts-ignore
import SearchSVG from "../../../../images/icons/magnifying_glass.svg"

interface Props {
  currentPath: string
  reduced?: boolean
  ignoreHypothesis?: boolean
  independentHiding?: boolean
}

const NavigationMenu: React.FC<NavVariantProps> = ({
  currentPath,
  reduced,
  navState,
  progress,
  toggleMenu,
  open,
  setNavState,
}) => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "nav-menu"])
  const { isVisible, navMode } = useNavMenuContext()

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

export default enhance({ hideOnMobile: true })(NavigationMenu)
