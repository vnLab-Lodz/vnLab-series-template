import React from "react"
import SeoMeta from "~components/molecules/seo-meta"
import { useTranslation } from "react-i18next"
import NavigationMenu from "~components/organisms/navigation-menu"
import { PageProps } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import useHypothesis from "src/hooks/useHypothesis"
import { useEffect } from "react"
import * as Styled from "../styles/page-styles/index"
import useIsMobile from "src/hooks/useIsMobile"
import NavMenuProvider, {
  NavMenuContext,
} from "~components/organisms/navigation-menu/nav-menu-context"
import { LangKey } from "~types/config"
import config from "../../publication/publication.config.json"
import styled from "styled-components"
import { NAV_MENU_STATES } from "~components/organisms/navigation-menu/types"

import Logo from "../images/icons/vnlab_logo.svg"
import HamburgerSVG from "../images/icons/hamburger.svg"
import TitleEN from "../images/title.en.inline.svg"
import TitlePL from "../images/title.pl.inline.svg"
import ServiceWorkerDialog from "~components/sw-dialog"

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const { hypothesis, hideHypothesis } = useHypothesis()
  const { t } = useTranslation(["common", "home"])
  const { locale } = useLocalization()

  const isMobile = useIsMobile(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    document.documentElement.style.setProperty(
      "--scrollbarWidth",
      `${scrollbarWidth}px`
    )
  })

  const properties = config[locale as LangKey]
  const { caption, people } = properties.author
  const SVG = titleSVG[locale as LangKey]

  useEffect(() => hideHypothesis(), [hypothesis])

  return (
    <NavMenuProvider>
      <NavigationMenu
        independentHiding
        ignoreHypothesis
        reduced={isMobile}
        currentPath={location.pathname}
        renderProps={{
          disableProgress: true,
          disableProgressText: true,
          constantColours: true,
        }}
      />
      <SeoMeta
        title={properties.title}
        lang={locale as LangKey}
        url={location.pathname}
      />
      <Styled.Background $noConstraint>
        <NavMenuContext.Consumer>
          {context => (
            <>
              <Styled.NavBtn type="button" onClick={() => context!.toggleNav()}>
                <img
                  className="sizeable-icon"
                  src={HamburgerSVG}
                  alt="Toggle Menu Button"
                />
              </Styled.NavBtn>
              <Styled.Miscalaneous>
                <Styled.TocButton
                  type="button"
                  onClick={() => context!.toggleNav(NAV_MENU_STATES.TOC)}
                >
                  <p>{t("home:toc")}</p>
                </Styled.TocButton>
                <Styled.LanguagePicker
                  standalone
                  currentPath={location.pathname}
                />
              </Styled.Miscalaneous>
            </>
          )}
        </NavMenuContext.Consumer>
        <Styled.Title>{properties.title}</Styled.Title>
        <Styled.People>
          <Styled.Role>{caption}</Styled.Role>
          {people.map((person, index) => (
            <Styled.Person key={index}>{person}</Styled.Person>
          ))}
        </Styled.People>
        <Styled.Logo src={Logo} alt="vnLab" />
        <SVG />
        <SVG data-duplicate />
      </Styled.Background>
      <ServiceWorkerDialog />
    </NavMenuProvider>
  )
}

export default IndexPage

const titleSVG = {
  en: styled(TitleEN)`
    ${Styled.backgroundTitleStyles}
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      & > g {
        transform: translateX(-250px);
      }
    }
  `,
  pl: styled(TitlePL)`
    ${Styled.backgroundTitleStyles}
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      & > g {
        transform: translateX(-36px);
      }
    }
  `,
}
