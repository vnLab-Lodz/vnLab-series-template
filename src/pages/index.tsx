import React, { useRef } from "react"
import SeoMeta from "~components/meta"
import { useTranslation } from "react-i18next"
import { GridContainer } from "~styles/grid"
import styled, { css } from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { devices } from "~styles/breakpoints"
import Edition from "~components/molecules/edition"
import atoms from "~components/atoms"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import NavigationMenu from "~components/organisms/navigation-menu"
import { PageProps } from "gatsby"
import LanguagePicker from "~components/molecules/language-picker"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

//@ts-ignore
import Logo from "../images/icons/vnlab_logo.svg"
//@ts-ignore
import ArrowDownSVG from "../images/icons/arrow_down.svg"
//@ts-ignore
import SearchSVG from "../images/icons/magnifying_glass.svg"
import TableOfContents from "~components/organisms/navigation-menu/tabs/toc"

const ImageWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;

  @media ${devices.laptop} {
    width: 50vw;
  }
`

const ContentWrapper = styled.aside`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr repeat(5, min-content) 1fr;
  align-content: end;

  @media ${devices.laptop} {
    grid-column: 1 / 17;
    grid-template-columns: repeat(16, 1fr);
  }
`

const StyledLanguagePicker = styled(LanguagePicker)`
  grid-row: 1;
  grid-column: -4;
  height: fit-content;
  margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
`

const SearchBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  grid-row: 1;
  grid-column: -3;
  height: fit-content;
  padding-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.8)`};
  margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
`

const LogoImg = styled.img`
  transform: rotate(90deg) translateY(-35%);

  @media ${devices.laptop} {
    grid-column: 5 / 7;
    grid-row: 2;
  }
`

const Title = styled(atoms.h1)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
} @media ${devices.laptop} {
  grid-column: 5 / 9;
  grid-row: 3;
}
`

const Editorship = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};

    @media ${devices.laptop} {
      grid-column: 5 / 9;
      grid-row: 4;
    }
  `}
`

const Author = styled(atoms.h3)`
  margin: 0px;
  margin-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.5)`};
  text-align: left;

  @media ${devices.laptop} {
    grid-column: 5 / 14;
    grid-row: 5;
  }
`

const WrappedEdition = styled(Edition)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: repeat(10, 1fr);

  @media ${devices.laptop} {
    grid-column: 5 / 16;
    grid-row: 6;
  }
`

const TocButton = styled.button`
  ${({ theme: { palette, spacing } }) => css`
    border: none;
    background: ${palette.black};
    color: ${palette.white};
    padding: ${spacing.md} 0px;
    display: grid;
    margin-top: calc(${spacing.xxl} * 2);
    cursor: pointer;

    @media ${devices.laptop} {
      grid-template-columns: repeat(16, 1fr);
      grid-column: 1 / 17;
      grid-row: 7;
    }
  `}
`

const TocBtnText = styled(atoms.p)`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    color: ${palette.white};
    text-transform: uppercase;
    text-align: left;

    @media ${devices.laptop} {
      grid-column: 5 / 8;
    }
  `}
`

const ArrowDownImg = styled.img`
  @media ${devices.laptop} {
    grid-column: 8;
  }
`

const TocWrapper = styled.div`
  @media ${devices.laptop} {
    grid-column: 3 / 17;
  }
`

const StyledTableOfContents = styled(TableOfContents)`
  overflow: hidden;
`

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const { t } = useTranslation(["common", "home"])
  const { locale } = useLocalization()
  const ref = useRef<HTMLDivElement | null>(null)

  const scorllToToC = () => {
    if (!ref || !ref.current) return

    scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })
  }

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <GridContainer style={{ minHeight: "100vh" }}>
        <SeoMeta title={t("home:title")} />
        <ImageWrapper>
          <StaticImage
            style={{ height: "100%" }}
            src="../images/home.png"
            alt="Figures on mirror"
            placeholder="blurred"
          />
        </ImageWrapper>
        <ContentWrapper>
          <StyledLanguagePicker dark currentPath={location.pathname} />
          <SearchBtn>
            <LocalizedLink to="/search" language={locale}>
              <img
                src={SearchSVG}
                alt="Magnifying glass"
                style={{ verticalAlign: "middle" }}
              />
            </LocalizedLink>
          </SearchBtn>
          <LogoImg src={Logo} alt="vnlab logo" />
          <Title>{t("common:title")}</Title>
          <Editorship>pod redakcją</Editorship>
          <Author type="primary">Krzysztofa Pijarskiego</Author>
          <WrappedEdition />
          <TocButton onClick={scorllToToC}>
            <TocBtnText>Spis treści</TocBtnText>
            <ArrowDownImg src={ArrowDownSVG} alt="Arrow down" />
          </TocButton>
        </ContentWrapper>
        <TocWrapper ref={ref}>
          <StyledTableOfContents />
        </TocWrapper>
      </GridContainer>
    </NavMenuProvider>
  )
}

export default IndexPage
