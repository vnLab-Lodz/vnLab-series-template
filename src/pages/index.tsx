import React, { useLayoutEffect, useRef, useState } from "react"
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
import useHypothesis from "src/hooks/useHypothesis"
import { useEffect } from "react"

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  filter: brightness(0.6);
  /* z-index: 10; */

  @media ${devices.tablet} {
    z-index: 10;
  }

  @media ${devices.laptop} {
    position: fixed;
    z-index: 0;
    display: block;
    width: 50vw;
  }
`

const ContentWrapper = styled.aside`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr repeat(6, min-content);
  align-content: end;
  grid-column: 1 / last-col;

  grid-template-columns: repeat(32, 1fr);

  z-index: 7;

  @media ${devices.tablet} {
    z-index: 11;
  }

  @media ${devices.laptop} {
    background-color: ${({ theme }) => theme.palette.white};
    grid-column: 1 / 17;
    grid-template-columns: repeat(16, 1fr);
  }
`

const StyledLanguagePicker = styled(LanguagePicker)`
  grid-row: 1;
  height: fit-content !important;
  margin-top: ${({ theme }) => `calc(67px + ${theme.spacing.sm} * 1.3)`};

  grid-column: -8 / -3;

  @media ${devices.tablet} {
    margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
    grid-column: -6 / -3;
  }

  @media ${devices.laptop} {
    grid-column: -4;
  }
`

const SearchBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  grid-row: 1;
  grid-column: -3;
  height: fit-content;
  padding-top: ${({ theme }) => `calc(${theme.spacing.xs} * 0.8)`};
  margin-top: ${({ theme }) => `calc(67px + ${theme.spacing.sm} * 1.3)`};
  filter: brightness(10);

  @media ${devices.tablet} {
    padding-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.8)`};
    margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
  }

  @media ${devices.laptop} {
    filter: none;
  }
`

const LogoImg = styled.img`
  transform: rotate(90deg) translateY(-35%);
  grid-row: 2;
  filter: brightness(10);
  grid-column: 2 / last-col;

  @media ${devices.tablet} {
    grid-column: 7 / last-col;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 7;
  }
`

const Title = styled(atoms.title)`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  grid-row: 3;
  grid-column: 2 / 16;
  filter: brightness(10);

  @media ${devices.tablet} {
    grid-column: 7 / 16;
  }

  @media ${devices.laptop} {
    grid-column: 5 / 9;
    filter: none;
    grid-row: 3;
  }
`

const Editorship = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};

    grid-column: 2 / -2;
    filter: brightness(10);

    @media ${devices.tablet} {
      grid-column: 7 / -2;
      font-weight: bold;
      grid-row: 4;
    }

    @media ${devices.laptop} {
      grid-column: 5 / 9;
      filter: none;
      grid-row: 4;
    }
  `}
`

const Author = styled(atoms.h3)`
  margin: 0px;
  margin-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.5)`};
  text-align: left;

  filter: brightness(10);
  grid-column: 2 / -2;

  @media ${devices.tablet} {
    grid-column: 7 / -2;
    grid-row: 5;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 14;
    grid-row: 5;
  }
`

const WrappedEdition = styled(Edition)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: repeat(10, 1fr);

  filter: brightness(10);
  grid-column: 2 / 11;

  @media ${devices.tablet} {
    filter: brightness(10);
    grid-column: 7 / 20;
    grid-row: 6;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 16;
    grid-row: 6;
  }
`

const TocButton = styled.button`
  ${({ theme: { palette, spacing } }) => css`
    border: none;
    background: ${palette.black};
    color: ${palette.white};
    padding: ${spacing.sm} 0px;
    display: grid;
    cursor: pointer;
    margin-top: calc(${spacing.lg});

    grid-template-columns: repeat(32, 1fr);
    grid-column: 1 / last-col;

    @media ${devices.tablet} {
      margin-top: calc(${spacing.xxl} * 2);
      padding: ${spacing.md} 0px;
      grid-column: 1 / last-col;
      grid-row: 7;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(16, 1fr);
      grid-column: 1 / 17;
      grid-row: 7;
    }

    @media (min-height: 1100px) {
      margin-top: 30vh;
    }

    @media (max-height: 650px) {
      margin-top: 0;
    }

    @media ${devices.desktop} {
      margin-top: calc(${spacing.xxl} * 2);
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
    grid-column: 2 / 11;

    @media ${devices.tablet} {
      grid-column: 7 / 12;
    }

    @media ${devices.laptop} {
      grid-column: 5 / 8;
    }
  `}
`

const ArrowDownImg = styled.img`
  @media ${devices.tablet} {
    grid-column: 12;
  }

  @media ${devices.laptop} {
    grid-column: 8;
  }
`

const TocWrapper = styled.div`
  background: ${({ theme }) => theme.palette.white};
  grid-column: 1 / last-col;
  min-height: 100vh;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    background: none;
    grid-column: 3 / 17;
  }
`

const StyledTableOfContents = styled(TableOfContents)`
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`

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
        <ImageWrapper>
          <StaticImage
            style={{ height: "100%", width: "100%" }}
            src="../images/home.png"
            alt="Figures on mirror"
            placeholder="blurred"
          />
        </ImageWrapper>
        <ContentWrapper>
          {!isMobile && (
            <>
              <StyledLanguagePicker
                dark
                standalone
                currentPath={location.pathname}
              />
              <SearchBtn>
                <LocalizedLink to="/search" language={locale}>
                  <img
                    className="sizeable-icon"
                    src={SearchSVG}
                    alt="Magnifying glass"
                    style={{ verticalAlign: "middle" }}
                  />
                </LocalizedLink>
              </SearchBtn>
            </>
          )}
          <LogoImg src={Logo} alt="vnlab logo" />
          <Title>{t("common:title")}</Title>
          <Editorship>{t("home:editorship")}</Editorship>
          <Author type="primary">Krzysztofa Pijarskiego</Author>
          <WrappedEdition />
          <TocButton onClick={scorllToToC}>
            <TocBtnText>{t("home:toc")}</TocBtnText>
            <ArrowDownImg src={ArrowDownSVG} alt="Arrow down" />
          </TocButton>
        </ContentWrapper>
        <TocWrapper ref={ref}>
          <StyledTableOfContents headless />
        </TocWrapper>
      </GridContainer>
    </NavMenuProvider>
  )
}

export default IndexPage
