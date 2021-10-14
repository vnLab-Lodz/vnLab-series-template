import { AnimatePresence, motion, useAnimation } from "framer-motion"
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import usePageContent from "src/hooks/usePageContent"
import { ThemeContext } from "styled-components"
import Arrow from "~components/molecules/arrow"
import { getSupportedFitContent } from "~util"
import Annotations from "./menus/annotations"
import Bibliography from "./menus/bibliography"
import Content from "./menus/content"
import Illustrations from "./menus/illustrations"
import { useLocalization } from "gatsby-theme-i18n"
import { SINGLE_AUTHOR_MODE } from "~util/constatnts"
import * as Styled from "./style"

//@ts-ignore
import ArrowDown from "src/images/icons/arrow_down.svg"

interface Props {
  currentPath: string
  noBibliography?: boolean
  className?: string
}

enum MENU_STATE {
  CLOSED,
  CONTENT,
  ILLUSTRATIONS,
  ANNOTATIONS,
  BIBLIOGRAPHY,
}

const ArticleMenu: React.FC<Props> = ({
  currentPath,
  noBibliography,
  className,
}) => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED)
  const [shouldStick, setShouldStick] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const { locale } = useLocalization()

  const scrollRef = useRef<number>(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollRef.current = window.pageYOffset
  }, [])

  const { palette } = useContext(ThemeContext)
  const { t } = useTranslation("common")
  const controls = useAnimation()

  const pageContent = usePageContent()

  const setState = (value: MENU_STATE) => {
    setMenuState(prev => (prev === value ? MENU_STATE.CLOSED : value))
  }

  const calcNavPosition = () => {
    if (!ref || !ref.current) return Infinity

    const doc = document.documentElement
    const elementRect = ref.current.getBoundingClientRect()

    return elementRect.top + doc.scrollTop
  }

  const onScroll = () => {
    const currentScrollPos = window.pageYOffset
    if (!ref || !ref.current) return

    const navPosition = calcNavPosition()

    currentScrollPos >= navPosition
      ? setShouldStick(true)
      : setShouldStick(false)

    currentScrollPos >= navPosition + 300
      ? setIsHidden(
          scrollRef.current < currentScrollPos &&
            menuState === MENU_STATE.CLOSED
        )
      : setIsHidden(false)

    scrollRef.current = currentScrollPos
  }

  const closeMenu = () => setState(MENU_STATE.CLOSED)

  const getMenuContent = () => {
    let content = <></>

    switch (menuState) {
      case MENU_STATE.CONTENT:
        content = <Content contents={pageContent} closeMenu={closeMenu} />
        break
      case MENU_STATE.ILLUSTRATIONS:
        content = <Illustrations closeMenu={closeMenu} />
        break
      case MENU_STATE.ANNOTATIONS:
        content = <Annotations closeMenu={closeMenu} />
        break
      case MENU_STATE.BIBLIOGRAPHY:
        content = <Bibliography currentPath={currentPath} />
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

  const getBibliographyButton = () => {
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

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [ref, menuState])

  useEffect(() => {
    controls.start(
      {
        borderBottomColor:
          menuState === MENU_STATE.CLOSED
            ? palette.dark
            : palette.transparentBlack,
      },
      { delay: 0.2, duration: 0.3, ease: "easeOut" }
    )

    return () => {
      controls.stop()
    }
  }, [menuState])

  return (
    <Styled.ArticleMenuContainer ref={ref} className={className}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {!isHidden && (
          <Styled.StickyWrapper
            as={motion.div}
            sticky={shouldStick}
            initial={{ translateY: -125, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -125, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={className}
          >
            <Styled.Layout>
              <Styled.MenuNav
                open={menuState !== MENU_STATE.CLOSED}
                as={motion.nav}
                animate={controls}
              >
                <Styled.Button onClick={() => setState(MENU_STATE.CONTENT)}>
                  <Styled.ButtonText>{t("content")}</Styled.ButtonText>{" "}
                  <Arrow inverted={menuState === MENU_STATE.CONTENT} />
                </Styled.Button>
                <Styled.Button
                  onClick={() => setState(MENU_STATE.ILLUSTRATIONS)}
                >
                  <Styled.ButtonText>{t("illustrations")}</Styled.ButtonText>{" "}
                  <Arrow inverted={menuState === MENU_STATE.ILLUSTRATIONS} />
                </Styled.Button>
                <Styled.Button onClick={() => setState(MENU_STATE.ANNOTATIONS)}>
                  <Styled.ButtonText>{t("annotations")}</Styled.ButtonText>{" "}
                  <Arrow inverted={menuState === MENU_STATE.ANNOTATIONS} />
                </Styled.Button>
                {!noBibliography && getBibliographyButton()}
              </Styled.MenuNav>
            </Styled.Layout>
            <AnimatePresence initial={false} exitBeforeEnter>
              {menuState !== MENU_STATE.CLOSED && (
                <Styled.MenuContent
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
          </Styled.StickyWrapper>
        )}
      </AnimatePresence>
    </Styled.ArticleMenuContainer>
  )
}

export default ArticleMenu
