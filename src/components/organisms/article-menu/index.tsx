import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { ImageDataLike } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import usePageContent from "src/hooks/usePageContent"

//@ts-ignore
import ArrowDown from "src/images/icons/arrow_down.svg"
import { ThemeContext } from "styled-components"
import atoms from "~components/atoms"
import Arrow from "~components/molecules/arrow"
import Layout from "../layout"
import Annotations from "./menus/annotations"
import Content from "./menus/content"
import Illustrations from "./menus/illustrations"
import * as Styled from "./style"

enum MENU_STATE {
  CLOSED,
  CONTENT,
  ILLUSTRATIONS,
  ANNOTATIONS,
  BIBLIOGRAPHY,
}

interface Props {
  images: ImageDataLike[]
}

const ArticleMenu: React.FC<Props> = ({ images }) => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED)
  const [shouldStick, setShouldStick] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)

  const scrollRef = useRef<number>(window?.pageYOffset ?? 0)
  const ref = useRef<HTMLDivElement | null>(null)

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

  const getMenuContent = () => {
    let content = <></>

    switch (menuState) {
      case MENU_STATE.CONTENT:
        content = (
          <Content
            contents={pageContent}
            closeMenu={() => setState(MENU_STATE.CLOSED)}
          />
        )
        break
      case MENU_STATE.ILLUSTRATIONS:
        content = <Illustrations images={images} />
        break
      case MENU_STATE.ANNOTATIONS:
        content = <Annotations />
        break
      case MENU_STATE.BIBLIOGRAPHY:
        content = (
          <atoms.p>
            We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
            dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest
            absurdalna, pozbawiona sensu i uzasadnienia w świecie, w którym
            piękno i miłość to synonimy życia. We wczesnych, zwłaszcza
            fabularnych filmach Agnès Vardy śmierć jest dla bohaterek
            egzystencjalnym skandalem – przychodzi znikąd, jest absurdalna,
            pozbawiona sensu i uzasadnienia w świecie, w którym piękno i miłość
            to synonimy życia. Śmierć jawi się jako coś w ścisłym sensie nie do
            pomyślenia czy wyobrażenia, nawet jeśli bohaterki muszą się z nią –
            zresztą tylko pozornie – skonfrontować w indywidualnym
            doświadczeniu. W Szczęściu (Le bonheur, 1965) śmierć (być może
            samobójcza) jednej z głównych bohaterek to jedyny moment, w którym
          </atoms.p>
        )
        break
      default:
        break
    }

    return (
      <motion.div
        key={menuState}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "fit-content", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {content}
      </motion.div>
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
    <Styled.ArticleMenuContainer ref={ref}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {!isHidden && (
          <Styled.StickyWrapper
            as={motion.div}
            sticky={shouldStick}
            initial={{ translateY: -125, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -125, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Layout>
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
                <Styled.Button
                  onClick={() => setState(MENU_STATE.BIBLIOGRAPHY)}
                >
                  <Styled.ButtonText>{t("bibliography")}</Styled.ButtonText>{" "}
                  <Arrow inverted={menuState === MENU_STATE.BIBLIOGRAPHY} />
                </Styled.Button>
              </Styled.MenuNav>
            </Layout>
            <AnimatePresence initial={false} exitBeforeEnter>
              {menuState !== MENU_STATE.CLOSED && (
                <Styled.MenuContet
                  initial={{ height: 0 }}
                  animate={{ height: "fit-content" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                >
                  <Styled.MenuLayout>
                    <AnimatePresence initial={false}>
                      {getMenuContent()}
                    </AnimatePresence>
                  </Styled.MenuLayout>
                </Styled.MenuContet>
              )}
            </AnimatePresence>
          </Styled.StickyWrapper>
        )}
      </AnimatePresence>
    </Styled.ArticleMenuContainer>
  )
}

export default ArticleMenu
