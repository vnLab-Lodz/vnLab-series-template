import React, { MutableRefObject, useCallback, useEffect } from "react"
import enhance, { NavVariantProps } from "../../enhance"
import * as Styled from "../../style"
import * as GraphicallyStyled from "./style"
import NavMenuContent from "../../components/content"
import { NAV_MODES } from "../../nav-menu-context"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"
import { useTheme } from "styled-components"
import {
  motion,
  useAnimation,
  useCycle,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion"

//@ts-ignore
import HamburgerSVG from "../../../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../../../images/icons/vnlab_logo.svg"

interface RenderProps {
  deck: MutableRefObject<any>
}

const GraphicalNavMenu: React.FC<NavVariantProps<RenderProps>> = ({
  open,
  navState,
  currentPath,
  setNavState,
  toggleMenu,
  renderProps,
}) => {
  const { deck } = renderProps

  const { t } = useTranslation(["common", "nav-menu"])
  const { locale } = useLocalization()
  const theme = useTheme()

  const slideProgress = useSpring(0)
  const slideProgressPercent = useTransform(slideProgress, [0, 1], [0, 100])
  const progress = useMotionTemplate`${slideProgressPercent}%`

  const controls = useAnimation()

  const translateValue = useSpring(100)
  const translateX = useMotionTemplate`${translateValue}%`

  const brightness = useTransform(translateValue, [0, 100], [10, 1], {})
  const filter = useMotionTemplate`brightness(${brightness})`
  const [background, cycleBackground] = useCycle(
    theme.palette.transparentBlack,
    theme.palette.black
  )

  const toggleWithAnimation = useCallback(() => {
    controls.start({
      opacity: open ? 1 : 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    })
    cycleBackground()
    toggleMenu()
  }, [controls, open])

  const handleSlideChange = useCallback(
    (e: any) => {
      const x = e.indexh === 0 ? 100 : 0
      translateValue.set(x)

      const slides = deck.current.getTotalSlides()
      const pastSlides = deck.current.getSlidePastCount()
      slideProgress.set(pastSlides / (slides - 1))
    },
    [deck.current]
  )

  useEffect(() => {
    if (!deck.current) return

    deck.current.on("slidechanged", handleSlideChange)
    return () => {
      deck.current.off("slidechanged", handleSlideChange)
    }
  }, [deck.current, handleSlideChange])

  return (
    <Styled.Aside noConstraint open={open}>
      <GraphicallyStyled.Nav mode={NAV_MODES.LIGHT} id="menu-nav">
        <GraphicallyStyled.BaseContainer>
          <GraphicallyStyled.ToggleBtn
            as={motion.button}
            style={{ background }}
            mode={NAV_MODES.DARK}
            open={open}
            onClick={toggleWithAnimation}
          >
            <motion.img
              style={{ filter }}
              className="sizeable-icon"
              src={open ? CloseSVG : HamburgerSVG}
              alt="Toggle Menu Button"
            />
          </GraphicallyStyled.ToggleBtn>
          <Styled.Title to="/" language={locale}>
            {t("common:title")}
          </Styled.Title>
          <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
        </GraphicallyStyled.BaseContainer>
        <GraphicallyStyled.SlideNavContainer
          style={{ translateX }}
          initial={{ opacity: 1 }}
          animate={controls}
        >
          <Styled.Progress
            light
            style={{ height: progress, width: progress }}
          />
          <GraphicallyStyled.ButtonsContainer spaced>
            <GraphicallyStyled.ArrowBtn>k</GraphicallyStyled.ArrowBtn>
            <GraphicallyStyled.ArrowBtn>h</GraphicallyStyled.ArrowBtn>
            <GraphicallyStyled.ArrowBtn>j</GraphicallyStyled.ArrowBtn>
            <GraphicallyStyled.ArrowBtn>l</GraphicallyStyled.ArrowBtn>
          </GraphicallyStyled.ButtonsContainer>
          <GraphicallyStyled.ButtonsContainer>
            <GraphicallyStyled.MediaBtn>a</GraphicallyStyled.MediaBtn>
            <GraphicallyStyled.MediaBtn>b</GraphicallyStyled.MediaBtn>
            <GraphicallyStyled.MediaBtn>CC</GraphicallyStyled.MediaBtn>
            <GraphicallyStyled.MediaBtn>d</GraphicallyStyled.MediaBtn>
          </GraphicallyStyled.ButtonsContainer>
        </GraphicallyStyled.SlideNavContainer>
      </GraphicallyStyled.Nav>
      <NavMenuContent
        open={open}
        navState={navState}
        setNavState={setNavState}
        currentPath={currentPath}
      />
    </Styled.Aside>
  )
}

export default enhance<RenderProps>({ hideOnMobile: false })(GraphicalNavMenu)
