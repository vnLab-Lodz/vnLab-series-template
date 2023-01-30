import { AnimatePresence, motion, useAnimation, useSpring } from "framer-motion"
import React, { CSSProperties, useContext, useEffect } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import usePageContent from "src/hooks/usePageContent"
import { useTheme } from "styled-components"
import Arrow from "~components/molecules/arrow"
import { isUndefined } from "~util"
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
import { useRefEffect } from "src/hooks/useRefEffect"

interface Props {
  spaced?: boolean
  currentPath: string
  noBibliography?: boolean
  className?: string
  menus?: MENUS[]
  onStateChange?: (state: MENU_STATE) => void
  bgColor?: CSSProperties["backgroundColor"]
}

type Resolver = (value: boolean) => boolean

enum MENU_STATE {
  CLOSED,
  CONTENT,
  ILLUSTRATIONS,
  ANNOTATIONS,
  BIBLIOGRAPHY,
}

export { MENU_STATE as ARTICLE_MENU_STATE }

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

  const { t } = useTranslation("common")
  const { setIsVisible } = useNavMenuContext()
  const isMobile = useIsMobile(mobile => !mobile && setIsVisible(true))

  const {
    palette: { light, dark, transparentBlack },
  } = useTheme()
  const { pauseScroll, resumeScroll, isPaused } = useScrollPause({
    backgroundColor: bgColor ?? light,
  })

  const pageContent = usePageContent()
  const bibliography = useBibliography(currentPath)
  const { images } = useContext(ImagesContext)
  const footnotes = useFootnotes()

  const isOpen = menuState !== MENU_STATE.CLOSED
  const directionUp = useScrollDirection({ threshold: 150 })
  const directionDown = useScrollDirection({ threshold: 5 })
  const controls = useAnimation()
  const translateY = useSpring(0)

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

  const hasMenu = (menu: MENUS, resolver?: Resolver): boolean => {
    const value = !!!menus ? true : menus.includes(menu)
    return !resolver ? value : resolver(value)
  }

  const getMenuContent = () => {
    switch (menuState) {
      case MENU_STATE.CONTENT:
        return <Content contents={pageContent} closeMenu={closeMenu} />
      case MENU_STATE.ILLUSTRATIONS:
        return <Illustrations images={images} closeMenu={closeMenu} />
      case MENU_STATE.ANNOTATIONS:
        return <Footnotes footnotes={footnotes} closeMenu={closeMenu} />
      case MENU_STATE.BIBLIOGRAPHY:
        return <Bibliography bibliography={bibliography} />
      default:
        return null
    }
  }

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
      setMenuState(MENU_STATE.CLOSED)
      if (isMobile) setIsVisible(false)
    }
  }, [directionUp, directionDown, shouldStick, isMobile])

  useEffect(() => {
    if (menuState !== MENU_STATE.CLOSED && !isPaused) {
      pauseScroll()
    } else if (menuState === MENU_STATE.CLOSED && isPaused) {
      resumeScroll()
    }

    const color = menuState === MENU_STATE.CLOSED ? dark : transparentBlack
    controls.start(
      { borderBottomColor: color },
      { delay: 0.2, duration: 0.3, ease: "easeOut" }
    )

    return () => controls.stop()
  }, [menuState])

  const [_, setRef] = useRefEffect<HTMLDivElement>(
    node => {
      const margin = isMobile ? "-66" : "-1"
      const observer = new IntersectionObserver(
        entries => setShouldStick(!entries[0].isIntersecting),
        { rootMargin: `${margin}px 0px 0px 0px`, threshold: [1] }
      )

      const listener = () => {
        if (shouldStick || !node) return setMaxContentHeight("88vh")
        const elementRect = node.getBoundingClientRect()
        const elementTop = elementRect.top
        if (elementTop > 0) setMaxContentHeight(`calc(88vh - ${elementTop}px)`)
      }

      listener()
      observer.observe(node)
      window.addEventListener("scroll", listener) // scroll due to header image

      return () => {
        observer.unobserve(node)
        window.removeEventListener("scroll", listener)
      }
    },
    [isMobile, shouldStick]
  )

  const hasContent = hasMenu(MENUS.CONTENT, value =>
    !menus ? pageContent.length > 1 : value
  )

  const hasImages = hasMenu(MENUS.ILLUSTRATIONS, value =>
    !menus ? images.length !== 0 : value
  )

  const hasFootnotes = hasMenu(MENUS.FOOTNOTES, value =>
    !menus ? !!footnotes && footnotes.length !== 0 : value
  )

  const hasBibliography = hasMenu(MENUS.BIBLIOGRAPHY, value =>
    !menus ? !noBibliography && !isUndefined(bibliography) : value
  )

  const content = getMenuContent()

  if (!hasContent && !hasImages && !hasFootnotes && !hasBibliography) {
    return null
  }

  return (
    <Styled.ArticleMenuContainer
      ref={setRef}
      className={className}
      $spaced={spaced}
      as={motion.div}
      style={{ translateY }}
    >
      <Styled.Layout>
        <Styled.MenuNav open={isOpen} as={motion.nav} animate={controls}>
          {hasContent && (
            <Styled.Button onClick={() => setState(MENU_STATE.CONTENT)}>
              <Styled.ButtonText>{t("content")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.CONTENT} />
            </Styled.Button>
          )}
          {hasImages && (
            <Styled.Button onClick={() => setState(MENU_STATE.ILLUSTRATIONS)}>
              <Styled.ButtonText>{t("illustrations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ILLUSTRATIONS} />
            </Styled.Button>
          )}
          {hasFootnotes && (
            <Styled.Button onClick={() => setState(MENU_STATE.ANNOTATIONS)}>
              <Styled.ButtonText>{t("annotations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ANNOTATIONS} />
            </Styled.Button>
          )}
          {hasBibliography && (
            <BibliographyButton menuState={menuState} setState={setState} />
          )}
        </Styled.MenuNav>
      </Styled.Layout>
      <AnimatePresence initial={false} exitBeforeEnter>
        {isOpen && (
          <Styled.MenuContent $maxHeight={maxContentHeight}>
            <Styled.MenuLayout>
              <AnimatePresence initial={false}>
                <Styled.AnimatedContent key={menuState}>
                  {content}
                </Styled.AnimatedContent>
              </AnimatePresence>
            </Styled.MenuLayout>
          </Styled.MenuContent>
        )}
      </AnimatePresence>
    </Styled.ArticleMenuContainer>
  )
}

export default ArticleMenu

const BibliographyButton: React.FC<{
  menuState: MENU_STATE
  setState: (value: MENU_STATE) => void
}> = ({ menuState, setState }) => {
  const { t } = useTranslation("common")
  const { locale } = useLocalization()

  if (SINGLE_AUTHOR_MODE) {
    return (
      <Styled.BibliographyLink language={locale} to="/bibliography">
        <Styled.Button onClick={() => {}}>
          <Styled.ButtonText>{t("bibliography")}</Styled.ButtonText>{" "}
        </Styled.Button>
      </Styled.BibliographyLink>
    )
  }

  return (
    <Styled.Button onClick={() => setState(MENU_STATE.BIBLIOGRAPHY)}>
      <Styled.ButtonText>{t("bibliography")}</Styled.ButtonText>{" "}
      <Arrow inverted={menuState === MENU_STATE.BIBLIOGRAPHY} />
    </Styled.Button>
  )
}
