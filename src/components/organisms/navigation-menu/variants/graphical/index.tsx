import React, { MutableRefObject, useCallback, useEffect } from "react"
import enhance, { NavVariantProps } from "../../enhance"
import * as Styled from "../../style"
import * as GraphicallyStyled from "./style"
import NavMenuContent from "../../components/content"
import { NAV_MODES } from "../../nav-menu-context"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"
import { useTheme } from "styled-components"
import useIsMobile from "src/hooks/useIsMobile"
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
//@ts-ignore
import HypothesisIcon from "../../../../../images/icons/hypothesis_rewers.svg"
//@ts-ignore
import CCIcon from "../../../../../images/icons/CC.svg"
//@ts-ignore
import OverviewOffIcon from "../../../../../images/icons/overview_off.svg"
//@ts-ignore
import FullscreenOffIcon from "../../../../../images/icons/fullscreen_off.svg"
//@ts-ignore
import SoundOffIcon from "../../../../../images/icons/sound_off.svg"
//@ts-ignore
import ArrowDown from "../../../../../images/icons/arrow_down.svg"

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

  const isMobile = useIsMobile()

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
            <GraphicallyStyled.Icon
              style={{ filter }}
              className="sizeable-icon"
              src={open ? CloseSVG : HamburgerSVG}
              alt="Toggle Menu Button"
            />
          </GraphicallyStyled.ToggleBtn>
          {!isMobile ? (
            <>
              <Styled.Title to="/" language={locale}>
                {t("common:title")}
              </Styled.Title>
              <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
            </>
          ) : (
            <NavigationButtons isMobile={isMobile} />
          )}
        </GraphicallyStyled.BaseContainer>
        {!isMobile && (
          <GraphicallyStyled.SlideNavContainer
            style={{ translateX }}
            initial={{ opacity: 1 }}
            animate={controls}
          >
            <Styled.Progress
              light
              style={{ height: progress, width: progress }}
            />
            <NavigationButtons isMobile={isMobile} />
            <UtilityButtons />
          </GraphicallyStyled.SlideNavContainer>
        )}
      </GraphicallyStyled.Nav>
      <NavMenuContent
        open={open}
        navState={navState}
        setNavState={setNavState}
        currentPath={currentPath}
      />
      {isMobile && (
        <GraphicallyStyled.BottomUtilityBar>
          <Styled.Progress
            light
            style={{ height: progress, width: progress }}
          />
          <UtilityButtons />
          <GraphicallyStyled.MediaBtn>
            <img
              style={{ height: 24, width: "auto" }}
              className="sizeable-icon"
              src={HypothesisIcon}
              alt="Hypothesis Button"
            />
          </GraphicallyStyled.MediaBtn>
        </GraphicallyStyled.BottomUtilityBar>
      )}
    </Styled.Aside>
  )
}

interface NavigationButtonsProps {
  isMobile: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ isMobile }) => {
  return (
    <GraphicallyStyled.ButtonsContainer spaced={!isMobile}>
      <GraphicallyStyled.ArrowBtn>
        <img
          style={{ height: 24, width: "auto", transform: "rotate(180deg)" }}
          className="sizeable-icon"
          src={ArrowDown}
          alt="Sound"
        />
      </GraphicallyStyled.ArrowBtn>
      <GraphicallyStyled.ArrowBtn>
        <img
          style={{ height: 24, width: "auto", transform: "rotate(90deg)" }}
          className="sizeable-icon"
          src={ArrowDown}
          alt="Sound"
        />
      </GraphicallyStyled.ArrowBtn>
      <GraphicallyStyled.ArrowBtn>
        <img
          style={{ height: 24, width: "auto", transform: "rotate(-90deg)" }}
          className="sizeable-icon"
          src={ArrowDown}
          alt="Sound"
        />
      </GraphicallyStyled.ArrowBtn>
      <GraphicallyStyled.ArrowBtn>
        <img
          style={{ height: 24, width: "auto" }}
          className="sizeable-icon"
          src={ArrowDown}
          alt="Sound"
        />
      </GraphicallyStyled.ArrowBtn>
    </GraphicallyStyled.ButtonsContainer>
  )
}

const UtilityButtons: React.FC = () => {
  return (
    <GraphicallyStyled.ButtonsContainer>
      <GraphicallyStyled.MediaBtn>
        <img
          style={{ height: 8, width: "auto" }}
          className="sizeable-icon"
          src={SoundOffIcon}
          alt="Sound"
        />
      </GraphicallyStyled.MediaBtn>
      <GraphicallyStyled.MediaBtn>
        <img
          style={{ height: 16, width: "auto" }}
          className="sizeable-icon"
          src={CCIcon}
          alt="CC"
        />
      </GraphicallyStyled.MediaBtn>
      <GraphicallyStyled.MediaBtn>
        <img
          style={{ height: 16, width: "auto" }}
          className="sizeable-icon"
          src={OverviewOffIcon}
          alt="Overview"
        />
      </GraphicallyStyled.MediaBtn>
      <GraphicallyStyled.MediaBtn>
        <img
          style={{ height: 16, width: "auto" }}
          className="sizeable-icon"
          src={FullscreenOffIcon}
          alt="Fulscreen"
        />
      </GraphicallyStyled.MediaBtn>
    </GraphicallyStyled.ButtonsContainer>
  )
}

export default enhance<RenderProps>({ hideOnMobile: false })(GraphicalNavMenu)
