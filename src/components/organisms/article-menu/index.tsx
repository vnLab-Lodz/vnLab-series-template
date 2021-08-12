import { AnimatePresence, motion, useAnimation } from "framer-motion"
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

//@ts-ignore
import ArrowDown from "src/images/icons/arrow_down.svg"
import { ThemeContext } from "styled-components"
import atoms from "~components/atoms"
import Arrow from "~components/molecules/arrow"
import Layout from "../layout"
import * as Styled from "./style"

enum MENU_STATE {
  CLOSED,
  CONTENT,
  ILLUSTRATIONS,
  ANNOTATIONS,
  BIBLIOGRAPHY,
}

const ArticleMenu = () => {
  const [menuState, setMenuState] = useState(MENU_STATE.CLOSED)
  const [shouldStick, setShouldStick] = useState(false)
  const { palette } = useContext(ThemeContext)
  const { t } = useTranslation("common")
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)

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
    if (!ref || !ref.current) return

    window.pageYOffset >= calcNavPosition()
      ? setShouldStick(true)
      : setShouldStick(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [ref])

  console.log(shouldStick)

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
      <Styled.StickyWrapper sticky={shouldStick}>
        <Layout>
          <Styled.MenuNav as={motion.nav} animate={controls}>
            <Styled.Button onClick={() => setState(MENU_STATE.CONTENT)}>
              <Styled.ButtonText>{t("content")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.CONTENT} />
            </Styled.Button>
            <Styled.Button onClick={() => setState(MENU_STATE.ILLUSTRATIONS)}>
              <Styled.ButtonText>{t("illustrations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ILLUSTRATIONS} />
            </Styled.Button>
            <Styled.Button onClick={() => setState(MENU_STATE.ANNOTATIONS)}>
              <Styled.ButtonText>{t("annotations")}</Styled.ButtonText>{" "}
              <Arrow inverted={menuState === MENU_STATE.ANNOTATIONS} />
            </Styled.Button>
            <Styled.Button onClick={() => setState(MENU_STATE.BIBLIOGRAPHY)}>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Styled.MenuLayout>
                <atoms.p>
                  We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć
                  jest dla bohaterek egzystencjalnym skandalem – przychodzi
                  znikąd, jest absurdalna, pozbawiona sensu i uzasadnienia w
                  świecie, w którym piękno i miłość to synonimy życia. Śmierć
                  jawi się jako coś w ścisłym sensie nie do pomyślenia czy
                  wyobrażenia, nawet jeśli bohaterki muszą się z nią – zresztą
                  tylko pozornie – skonfrontować w indywidualnym doświadczeniu.
                  W Szczęściu (Le bonheur, 1965) śmierć (być może samobójcza)
                  jednej z głównych bohaterek to jedyny moment, w którym celowo
                  sztuczna, nadmiernie pogodna i beztroska tonacja filmu zostaje
                  na krótką chwilę zawieszona – widzimy zwłoki młodej, pięknej
                  kobiety, której odejście pozwala zrealizować męską fantazję o
                  niemal bezbolesnym zastąpieniu jednej kobiety przez inną, żony
                  przez kochankę. Umieranie nie jest tutaj zatem problemem, co
                  najwyżej pozbawia problemu tych, którzy pozostali przy życiu.
                  Nie dowiadujemy się, co kierowało bohaterką, a jej walka o
                  życie zredukowana zostaje do mikroujęć pokazujących ją, jak
                  tonąc, chwyta się zwieszających się nad wodą gałęzi. To
                  jedynie drobny epizod, mocny, choć tylko pozorny zwrot
                  dramaturgiczny, który nie narusza w istocie ani ciągłości
                  opowiadania, ani harmonii otaczającej rzeczywistości – i
                  dlatego jest skandalem.
                </atoms.p>
              </Styled.MenuLayout>
            </Styled.MenuContet>
          )}
        </AnimatePresence>
      </Styled.StickyWrapper>
    </Styled.ArticleMenuContainer>
  )
}

export default ArticleMenu
