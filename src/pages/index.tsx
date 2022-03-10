import React, { useRef } from "react"
import SeoMeta from "~components/meta"
import { useTranslation } from "react-i18next"
import { GridContainer } from "~styles/grid"
import { StaticImage } from "gatsby-plugin-image"
import NavigationMenu from "~components/organisms/navigation-menu"
import { PageProps } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import useHypothesis from "src/hooks/useHypothesis"
import { useEffect } from "react"
import * as Styled from "../styles/page-styles/index"
import useIsMobile from "src/hooks/useIsMobile"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"

//@ts-ignore
import Logo from "../images/icons/vnlab_logo.svg"
//@ts-ignore
import ArrowDownSVG from "../images/icons/arrow_down.svg"
//@ts-ignore
import SearchSVG from "../images/icons/magnifying_glass.svg"
//@ts-ignore
import HamburgerSVG from "../images/icons/hamburger.svg"
//@ts-ignore
import TitleEN from "../images/title_en.svg"
//@ts-ignore
import TitlePL from "../images/title_pl.svg"

const titleSVG = {
  en: TitleEN,
  pl: TitlePL,
}

const NavMenuToggle: React.FC = () => {
  const { toggleNav } = useNavMenuContext()

  return (
    <Styled.NavBtn onClick={() => setTimeout(() => toggleNav(), 180)}>
      <img
        className="sizeable-icon"
        src={HamburgerSVG}
        alt="Toggle Menu Button"
      />
    </Styled.NavBtn>
  )
}

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const { hypothesis, hideHypothesis } = useHypothesis()
  const { t } = useTranslation(["common", "home"])
  const { locale } = useLocalization()
  const ref = useRef<HTMLDivElement | null>(null)

  const isMobile = useIsMobile(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    document.documentElement.style.setProperty(
      "--scrollbarWidth",
      `${scrollbarWidth}px`
    )
  })

  const title = titleSVG[locale as "en" | "pl"]

  const scrollToToC = () => {
    if (!ref || !ref.current) return

    scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })
  }

  useEffect(() => {
    hideHypothesis()
  }, [hypothesis])

  return (
    <NavMenuProvider>
      <NavigationMenu
        independentHiding
        ignoreHypothesis
        reduced={isMobile}
        currentPath={location.pathname}
      />
      <GridContainer style={{ minHeight: "100vh" }} noConstraint>
        <SeoMeta title={t("home:title")} />
        <Styled.ImageWrapper>
          <StaticImage
            style={{ height: "100%", width: "100%" }}
            src="../images/home.png"
            alt="Figures on mirror"
            placeholder="blurred"
          />
        </Styled.ImageWrapper>
        <Styled.ContentWrapper>
          {!isMobile && (
            <Styled.Header>
              <NavMenuToggle />
              <Styled.LanguagePicker
                flex
                dark
                standalone
                currentPath={location.pathname}
              />
            </Styled.Header>
          )}
          <Styled.Center>
            <Styled.LogoImg src={Logo} alt="vnlab logo" />
            <Styled.Title src={title} alt="Title" />
            <Styled.Editorship>{t("home:editorship")}</Styled.Editorship>
            <Styled.Author type="primary">
              <Styled.BiogramLink
                to="/biograms/krzysztof_pijarski"
                lang={locale}
              >
                {t("home:author")}
              </Styled.BiogramLink>
            </Styled.Author>
            <Styled.WrappedEdition />
          </Styled.Center>

          <Styled.TocButton onClick={scrollToToC}>
            <Styled.TocBtnContent>
              <Styled.TocBtnText>{t("home:toc")}</Styled.TocBtnText>
              <Styled.ArrowDownImg src={ArrowDownSVG} alt="Arrow down" />
            </Styled.TocBtnContent>
          </Styled.TocButton>
        </Styled.ContentWrapper>
        <Styled.TocWrapper ref={ref}>
          <Styled.TableOfContents headless />
        </Styled.TocWrapper>
      </GridContainer>
    </NavMenuProvider>
  )
}

export default IndexPage
