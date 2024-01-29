import React, { PropsWithChildren, useMemo } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink, useLocalization } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/molecules/seo-meta"
import { FootnoteIndex, FootnoteTarget } from "~components/molecules/footnote"
import atoms from "~components/atoms"
import ArticleMenu from "~components/organisms/article-menu"
import styled, { StyledComponent, useTheme } from "styled-components"
import ViewportImage from "~components/molecules/viewport-image"
import HeaderImage from "~components/molecules/header-image"
import ArticleFooter from "~components/organisms/article-footer"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import Carousel from "~components/organisms/carousel"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"
import { devices } from "~styles/breakpoints"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import { LangKey, MENUS } from "~types"
import { GridContainer } from "~styles/grid"
import { BackgroundGlobals } from "~styles/globals"
import { components } from "~components/mdx"
import { MdxContext } from "src/context/mdx-provider"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"
import ServiceWorkerDialog from "~components/sw-dialog"

export const mdxComponents = {
  strong: atoms.strong,
  em: atoms.em,
  del: atoms.del,
  a: atoms.a,
  // ---- ---- ---- ----
  p: components.p,
  h1: components.h1,
  h2: components.h2,
  h3: components.h3,
  blockquote: components.blockquote,
  ul: components.ul,
  ol: components.ol,
  button: components.button,
  hr: components.hr,
  table: components.table,
  // ---- ---- ---- ----
  Link: MdxLink,
  // ---------
  BlockQuote: components.blockquote,
  Quote: components.quote,
  Abstract: components.Abstract,
  Author: components.Author,
  Edition: components.Edition,
  // ---- ---- ---- ----
  Carousel: Carousel,
  ViewportImage: ViewportImage,
  // ---- ---- ---- ----
  FootnoteTarget: FootnoteTarget,
  FootnoteIndex: FootnoteIndex,
  Tag: components.Tag,
}

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
      embeddedImagesLocal: ImageDataLike[]
      headerImage?: ImageDataLike
      menus?: MENUS[]
      summary?: string
    }
  }
  footnotes: {
    nodes: Footnote[]
  }
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
      <HypothesisBtn />
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
                <MDXProvider components={mdxComponents}>
                  <SeoMeta
                    title={title}
                    lang={locale as LangKey}
                    description={mdx.frontmatter.summary}
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
            <ArticleFooter currentPath={location.pathname} />
            <ServiceWorkerDialog />
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

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.light};
  padding-top: ${({ theme }) => theme.spacing.xxxl};
  overflow: initial;

  @media ${devices.desktop} {
    justify-content: center;
    margin: auto;
  }
`

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.light};
`

export const addClass =
  (
    Component:
      | React.FC<PropsWithChildren<{ className: string }>>
      | StyledComponent<any, any>,
    className: string
  ): React.FC<PropsWithChildren<unknown>> =>
  ({ children }) =>
    <Component className={className}>{children}</Component>
