import React, { useMemo } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import atoms from "~components/atoms"
import ArticleMenu from "~components/organisms/article-menu"
import styled, { css, useTheme } from "styled-components"
import HeaderImage from "~components/molecules/header-image"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"
import { devices } from "~styles/breakpoints"
import { addClass, mdxComponents } from "./chapter"
import { MENUS } from "~types"
import withGridConstraint from "src/hoc/withGridConstraint"
import { GridContainer } from "~styles/grid"
import { useLocalization } from "gatsby-theme-i18n"
import { BackgroundGlobals } from "~styles/globals"
import { MdxContext } from "src/context/mdx-provider"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
      embeddedImagesLocal: ImageDataLike[]
      headerImage?: ImageDataLike
      menus?: MENUS[]
    }
  }
  footnotes: {
    nodes: Footnote[]
  }
}

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.light};
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
  min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxxl})`};
  padding-top: ${({ theme }) => theme.spacing.xxxl};

  @media ${devices.tablet} {
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
    min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxl})`};
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(32, max(3.125rem));
    justify-content: center;
  }
`

const StyledH1 = styled(atoms.h1)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    text-align: center;
    font-weight: bold;

    font-size: 32px;

    @media ${devices.tablet} {
      font-size: 45px;
    }

    @media ${devices.desktop} {
      font-size: 80px;
    }
  `};
`

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.light};
`

const components = {
  ...mdxComponents,
  h1: withGridConstraint(addClass(StyledH1, "mdx-heading")),
}

const Section: React.FC<PageProps<Data>> = ({ data, location }) => {
  const { mdx, footnotes } = data

  const { embeddedImagesLocal, headerImage, title, menus } = mdx.frontmatter
  const { locale } = useLocalization()
  const theme = useTheme()

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

  const mdxContext = useMemo(() => ({ id: mdx.id }), [mdx.id])

  return (
    <NavMenuProvider>
      <BackgroundGlobals color={theme.palette.light} />
      <MdxContext.Provider value={mdxContext}>
        <NavigationMenu currentPath={location.pathname} />
        <FootnotesContext.Provider value={footnotes.nodes}>
          <ImagesProvider initialImages={getInitialImages()}>
            {headerImage && <HeaderImage image={headerImage} />}
            <ArticleMenu
              currentPath={location.pathname}
              menus={menus}
              spaced={!headerImage}
            />
            <StyledArticle>
              <StyledLayout $flexible className="mdx-section">
                <MDXProvider components={components}>
                  <SeoMeta
                    title={title}
                    lang={locale}
                    url={location.pathname}
                  />
                  <MDXRenderer
                    frontmatter={mdx.frontmatter}
                    localImages={embeddedImagesLocal}
                  >
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
              </StyledLayout>
            </StyledArticle>
          </ImagesProvider>
        </FootnotesContext.Provider>
      </MdxContext.Provider>
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
    footnotes: allFootnotes(
      filter: {
        mdx: { fields: { locale: { eq: $locale } }, slug: { in: $slugs } }
      }
    ) {
      nodes {
        id
        link
        index
        content
      }
    }
  }
`

export default Section
