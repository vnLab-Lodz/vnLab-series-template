import React, { useContext, useLayoutEffect, useRef, useState } from "react"
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
import NavMenuProvider, {
  NavMenuContext,
} from "~components/organisms/navigation-menu/nav-menu-context"

//@ts-ignore
import Logo from "../images/icons/vnlab_logo.svg"
//@ts-ignore
import ArrowDownSVG from "../images/icons/arrow_down.svg"
//@ts-ignore
import SearchSVG from "../images/icons/magnifying_glass.svg"
//@ts-ignore
import HamburgerSVG from "../images/icons/hamburger.svg"

const NavMenuToggle: React.FC = () => {
  const { toggleNav } = useContext(NavMenuContext)

  return (
    <Styled.NavBtn
      onClick={() => {
        // scrollToToC()
        setTimeout(() => toggleNav(), 180)
      }}
    >
      <img
        className="sizeable-icon"
        src={HamburgerSVG}
        alt="Toggle Menu Button"
      />
    </Styled.NavBtn>
  )
}

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const [isMobile, setIsMobile] = useState(false)
  const hypothesis = useHypothesis()
  const { t } = useTranslation(["common", "home"])
  const { locale } = useLocalization()
  const ref = useRef<HTMLDivElement | null>(null)

  const scorllToToC = () => {
    if (!ref || !ref.current) return

    scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })
  }

  useEffect(() => {
    hypothesis?.classList.add("invisible")
    return () => {
      hypothesis?.classList.remove("invisible")
    }
  }, [hypothesis])

  const determineDevice = () => {
    setIsMobile(window.innerWidth < 768)

    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    document.documentElement.style.setProperty(
      "--scrollbarWidth",
      `${scrollbarWidth}px`
    )
  }

  useLayoutEffect(() => {
    determineDevice()
    window.addEventListener("resize", determineDevice)

    return () => {
      window.removeEventListener("resize", determineDevice)
    }
  }, [])

  return (
    <NavMenuProvider>
      <NavigationMenu
        reduced={isMobile}
        ignoreHypothesis
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
              <Styled.SearchBtn flex>
                <LocalizedLink to="/search" language={locale}>
                  <img
                    className="sizeable-icon"
                    src={SearchSVG}
                    alt="Magnifying glass"
                    style={{ verticalAlign: "middle" }}
                  />
                </LocalizedLink>
              </Styled.SearchBtn>
            </Styled.Header>
          )}
          <Styled.LogoImg src={Logo} alt="vnlab logo" />
          <Styled.Title>{t("common:title")}</Styled.Title>
          <Styled.Editorship>{t("home:editorship")}</Styled.Editorship>
          <Styled.Author type="primary">
            <Styled.BiogramLink to="/biograms/krzysztof_pijarski" lang={locale}>
              {t("home:author")}
            </Styled.BiogramLink>
          </Styled.Author>
          <Styled.WrappedEdition />
          <Styled.TocButton onClick={scorllToToC}>
            <Styled.TocBtnText>{t("home:toc")}</Styled.TocBtnText>
            <Styled.ArrowDownImg src={ArrowDownSVG} alt="Arrow down" />
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
