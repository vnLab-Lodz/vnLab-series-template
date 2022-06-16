import React, { useState } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import ArticleMenu, {
  ARTICLE_MENU_STATE,
} from "~components/organisms/article-menu"
import styled, { ThemeProvider } from "styled-components"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
import HeaderImage from "~components/molecules/header-image"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"
import { devices } from "~styles/breakpoints"
import { mdxComponents } from "./chapter"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import { MENUS } from "~types"
import { GridContainer } from "~styles/grid"
import lightTheme from "~styles/theme"
import { ButtonText } from "../components/organisms/article-menu/style"
import { THEME_MODES } from "src/context/theme-switcher-context"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { useLocalization } from "gatsby-theme-i18n"
import { BackgroundGlobals } from "~styles/globals"

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
      menus?: MENUS[]
      embeddedImagesLocal: ImageDataLike[]
      headerImage?: ImageDataLike
    }
  }
}

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.quaternary};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
  min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxxl})`};

  @media ${devices.tablet} {
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
    min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxl})`};
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(32, max(3.125rem));
    justify-content: center;
  }
`

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.quaternary};
`

const StyledArticleMenu = styled(ArticleMenu)<{
  open: boolean
  themeMode: THEME_MODES
}>`
  background-color: ${({ theme }) => theme.palette.quaternary};

  ${ButtonText} {
    color: ${({ open, themeMode, theme }) =>
      !open && themeMode === THEME_MODES.DARK
        ? "rgb(31, 31, 31)"
        : theme.palette.black};
  }

  .character-arrow {
    color: ${({ open, themeMode, theme }) =>
      !open && themeMode === THEME_MODES.DARK
        ? "rgb(31, 31, 31)"
        : theme.palette.black};
  }
`

const Section: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
  const [articleMenuState, setArticleMenuState] = useState<ARTICLE_MENU_STATE>(
    ARTICLE_MENU_STATE.CLOSED
  )
  const { embeddedImagesLocal, headerImage, title, menus } = mdx.frontmatter
  const { locale } = useLocalization()
  const { themeMode } = useThemeSwitcherContext()

  const getInitialImages = (): Image[] => {
    return !!headerImage
      ? [
          {
            imageData: headerImage as IGatsbyImageData,
            calculatePosition: () => 0,
          },
        ]
      : []
  }

  return (
    <NavMenuProvider>
      <BackgroundGlobals color={lightTheme.palette.quaternary} />
      <HypothesisBtn />
      <NavigationMenu currentPath={location.pathname} />
      <AnnotationProvider>
        <ImagesProvider initialImages={getInitialImages()}>
          {headerImage && <HeaderImage image={headerImage} />}
          <StyledArticleMenu
            noBibliography
            spaced={!headerImage}
            currentPath={location.pathname}
            menus={menus}
            themeMode={themeMode}
            open={articleMenuState !== ARTICLE_MENU_STATE.CLOSED}
            onStateChange={setArticleMenuState}
          />
          <ThemeProvider theme={lightTheme}>
            <StyledArticle>
              <StyledLayout flexible className="mdx-section">
                <MDXProvider components={mdxComponents}>
                  <SeoMeta title={title} lang={locale} />
                  <MDXRenderer
                    frontmatter={mdx.frontmatter}
                    localImages={embeddedImagesLocal}
                  >
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
              </StyledLayout>
            </StyledArticle>
          </ThemeProvider>
        </ImagesProvider>
      </AnnotationProvider>
    </NavMenuProvider>
  )
}

export const query = graphql`
  query ($locale: String!, $slugs: [String]) {
    mdx(fields: { locale: { eq: $locale } }, slug: { in: $slugs }) {
      id
      body
      frontmatter {
        title
        author
        index
        summary
        menus
        headerImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default Section
