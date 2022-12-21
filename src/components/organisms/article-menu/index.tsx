import { AnimatePresence, motion, useAnimation, useSpring } from "framer-motion"
import React, { CSSProperties, useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import usePageContent from "src/hooks/usePageContent"
import { ThemeContext, useTheme } from "styled-components"
import Arrow from "~components/molecules/arrow"
import { getSupportedFitContent, isUndefined } from "~util"
import Footnotes from "./menus/annotations"
import Bibliography from "./menus/bibliography"
import Content from "./menus/content"
import Illustrations from "./menus/illustrations"
import { useLocalization } from "gatsby-theme-i18n"
import { SINGLE_AUTHOR_MODE } from "~util/constants"
import * as Styled from "./style"
import { MENUS } from "~types"
import useBibliography from "src/hooks/useBibliography"
import { ImagesContext } from "src/context/illustrations-context"
import useScrollPause from "src/hooks/useScrollPause"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import useIsMobile from "src/hooks/useIsMobile"
import useScrollDirection, {
  SCROLL_DIRECTION,
} from "src/hooks/useScrollDirection"
import { useFootnotes } from "src/context/footnotes-context"

interface Props {
  spaced?: boolean
  currentPath: string
  noBibliography?: boolean
  className?: string
  menus?: MENUS[]
  onStateChange?: (state: MENU_STATE) => void
  bgColor?: CSSProperties["backgroundColor"]
}

enum MENU_STATE {
  CLOSED,
  CONTENT,
  ILLUSTRATIONS,
  ANNOTATIONS,
  BIBLIOGRAPHY,
}

export { MENU_STATE as ARTICLE_MENU_STATE }

const BibliographyButton: React.FC<{
  menuState: MENU_STATE
  setState: (value: MENU_STATE) => void
}> = ({ menuState, setState }) => {
  const { t } = useTranslation("common")
  const { locale } = useLocalization()

  return SINGLE_AUTHOR_MODE ? (
    <Styled.BibliographyLink language={locale} to="/bibliography">
      <Styled.Button onClick={() => {}}>
        <Styled.ButtonText>{t("bibliography")}</Styled.ButtonText>{" "}
      </Styled.Button>
    </Styled.BibliographyLink>
  ) : (
    <Styled.Button onClick={() => setState(MENU_STATE.BIBLIOGRAPHY)}>
      <Styled.ButtonText>{t("bibliography")}</Styled.ButtonText>{" "}
      <Arrow inverted={menuState === MENU_STATE.BIBLIOGRAPHY} />
    </Styled.Button>
  )
}

const ArticleMenu: React.FC<Props> = ({
  currentPath,
  noBibliography,
  onStateChange,
  className,
  menus,
  spaced,
  bgColor,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED)
  const [shouldStick, setShouldStick] = useState<boolean>(false)
  const [maxContentHeight, setMaxContentHeight] = useState("88vh")

  const { setIsVisible } = useNavMenuContext()
  const isMobile = useIsMobile(mobile => !mobile && setIsVisible(true))

  const theme = useTheme()
  const { pauseScroll, resumeScroll, isPaused } = useScrollPause({
    backgroundColor: bgColor ?? theme.palette.light,
  })

  const ref = useRef<HTMLDivElement | null>(null)

  const { palette } = useContext(ThemeContext)
  const { t } = useTranslation("common")
  const controls = useAnimation()

  const pageContent = usePageContent()
  const bibliography = useBibliography(currentPath)
  const { images } = useContext(ImagesContext)
  const footnotes = useFootnotes()

  const setState = (value: MENU_STATE) => {
    setMenuState(prev => {
      const newState = prev === value ? MENU_STATE.CLOSED : value
      onStateChange?.(newState)
      return newState
    })
  }

  const closeMenu = (callback?: () => void) => {
    resumeScroll(() => {
      setState(MENU_STATE.CLOSED)
      if (callback) callback()
    })
  }

  const getMenuContent = () => {
    let content = <></>

    switch (menuState) {
      case MENU_STATE.CONTENT:
        content = <Content contents={pageContent} closeMenu={closeMenu} />
        break
      case MENU_STATE.ILLUSTRATIONS:
        content = <Illustrations images={images} closeMenu={closeMenu} />
        break
      case MENU_STATE.ANNOTATIONS:
        content = <Footnotes footnotes={footnotes} closeMenu={closeMenu} />
        break
      case MENU_STATE.BIBLIOGRAPHY:
        content = <Bibliography bibliography={bibliography} />
        break
      default:
        break
    }

    return (
      <motion.div
        key={menuState}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: getSupportedFitContent(), opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {content}
      </motion.div>
    )
  }

  const directionUp = useScrollDirection({ threshold: 150 })
  const directionDown = useScrollDirection({ threshold: 5 })

  const translateY = useSpring(0)

  useEffect(() => {
    if (!isMobile) setIsVisible(true)

    if (!shouldStick) {
      translateY.set(0)
      if (isMobile) setIsVisible(true)
      return
    }

    if (
      directionUp === SCROLL_DIRECTION.UP &&
      directionDown === SCROLL_DIRECTION.UP
    ) {
      translateY.set(0)
      if (isMobile) setIsVisible(true)
    } else if (directionDown === SCROLL_DIRECTION.DOWN) {
      translateY.set(-170)
      if (isMobile) setIsVisible(false)
    }
  }, [directionUp, directionDown, shouldStick])

  useEffect(() => {
    if (!ref || ref.current === null) return

    const margin = isMobile ? "-66" : "-1"
    const observer = new IntersectionObserver(
      entries => setShouldStick(!entries[0].isIntersecting),
      { rootMargin: `${margin}px 0px 0px 0px`, threshold: [1] }
    )

    observer.observe(ref.current)

    return () => {
      if (ref && ref.current !== null) observer.unobserve(ref.current)
    }
  }, [ref.current, isMobile])

  useEffect(() => {
    if (menuState !== MENU_STATE.CLOSED && !isPaused) {
      pauseScroll()
    } else if (menuState === MENU_STATE.CLOSED && isPaused) {
      resumeScroll()
    }

    controls.start(
      {
        borderBottomColor:
          menuState === MENU_STATE.CLOSED
            ? palette.dark
            : palette.transparentBlack,
      },
      { delay: 0.2, duration: 0.3, ease: "easeOut" }
    )

    return () => controls.stop()
  }, [menuState])

  useEffect(() => {
    const listener = () => {
      if (shouldStick || !ref || !ref.current) {
        setMaxContentHeight("88vh")
        return
      }

      const elementRect = ref.current.getBoundingClientRect()
      setMaxContentHeight(`calc(88vh - ${elementRect.top}px)`)
    }

    listener()
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [shouldStick, menuState, ref.current])

  const shouldRenderMenu = (
    menu: MENUS,
    resolver?: (value: boolean) => boolean
  ): boolean => {
    const value = !!!menus ? true : menus.includes(menu)
    if (!!!resolver) return value

    return resolver(value)
  }

  const shouldRenderContent = shouldRenderMenu(MENUS.CONTENT, value =>
    !!!menus ? pageContent.length > 1 : value
  )

  const shouldRenderIllustrations = shouldRenderMenu(
    MENUS.ILLUSTRATIONS,
    value => (!!!menus ? images.length !== 0 : value)
  )

  const shouldRenderFootnotes = shouldRenderMenu(MENUS.FOOTNOTES, value =>
    !!!menus ? !!footnotes && footnotes.length !== 0 : value
  )

  const shouldRenderBibliography = shouldRenderMenu(MENUS.BIBLIOGRAPHY, value =>
    !!!menus ? !noBibliography && !isUndefined(bibliography) : value
  )

  if (
    !shouldRenderContent &&
    !shouldRenderIllustrations &&
    !shouldRenderFootnotes &&
    !shouldRenderBibliography
  )
    return <></>

  return (
    <Styled.ArticleMenuContainer
      ref={ref}
      className={className}
      $spaced={spaced}
      as={motion.div}
      style={{ translateY }}
    >
      <Styled.Layout>
        <Styled.MenuNav
          open={menuState !== MENU_STATE.CLOSED}
          as={motion.nav}
          animate={controls}
        >
          {shouldRenderContent && (
            <Styled.Button onClick={() => setState(MENU_STATE.CONTENT)}>
              <Styled.ButtonText>{t("content")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.CONTENT} />
            </Styled.Button>
          )}
          {shouldRenderIllustrations && (
            <Styled.Button onClick={() => setState(MENU_STATE.ILLUSTRATIONS)}>
              <Styled.ButtonText>{t("illustrations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ILLUSTRATIONS} />
            </Styled.Button>
          )}
          {shouldRenderFootnotes && (
            <Styled.Button onClick={() => setState(MENU_STATE.ANNOTATIONS)}>
              <Styled.ButtonText>{t("annotations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ANNOTATIONS} />
            </Styled.Button>
          )}
          {shouldRenderBibliography && (
            <BibliographyButton menuState={menuState} setState={setState} />
          )}
        </Styled.MenuNav>
      </Styled.Layout>
      <AnimatePresence initial={false} exitBeforeEnter>
        {menuState !== MENU_STATE.CLOSED && (
          <Styled.MenuContent
            $maxHeight={maxContentHeight}
            initial={{ height: 0 }}
            animate={{ height: getSupportedFitContent() }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          >
            <Styled.MenuLayout>
              <AnimatePresence initial={false}>
                {getMenuContent()}
              </AnimatePresence>
            </Styled.MenuLayout>
          </Styled.MenuContent>
        )}
      </AnimatePresence>
    </Styled.ArticleMenuContainer>
  )
}

export default ArticleMenu
