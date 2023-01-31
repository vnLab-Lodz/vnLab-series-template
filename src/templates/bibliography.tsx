import React, { useMemo } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/molecules/seo-meta"
import Layout from "~components/organisms/layout"
import styled, { useTheme } from "styled-components"
import HeaderImage from "~components/molecules/header-image"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"
import { devices } from "~styles/breakpoints"
import { mdxComponents } from "./chapter"
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
    }
  }
  footnotes: {
    nodes: Footnote[]
  }
}

const StyledLayout = styled(Layout)`
  background: ${({ theme: { palette } }) => palette.light};
  padding-top: ${({ theme }) => theme.spacing.xxxl};
  min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxxl})`};

  @media ${devices.tablet} {
    padding-top: ${({ theme }) => theme.spacing.xxl};
    min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xxl})`};
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(32, max(3.125rem));
    justify-content: center;
  }
`

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.light};
`

const Section: React.FC<PageProps<Data>> = ({ data, location }) => {
  const { mdx, footnotes } = data

  const { embeddedImagesLocal, headerImage, title } = mdx.frontmatter
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
            <StyledArticle>
              <StyledLayout className="mdx-section">
                <MDXProvider components={mdxComponents}>
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
