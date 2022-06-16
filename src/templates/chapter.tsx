import React, { PropsWithChildren } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink, useLocalization } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import Abstract from "~components/molecules/abstract"
import Annotation from "~components/molecules/annotation"
import Quote from "~components/molecules/quote"
import atoms from "~components/atoms"
import Author from "~components/molecules/author"
import Edition from "~components/molecules/edition"
import ArticleMenu from "~components/organisms/article-menu"
import styled, { StyledComponent, useTheme } from "styled-components"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
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
import { MENUS } from "~types"
import { GridContainer } from "~styles/grid"
import withGridConstraint from "src/hoc/withGridConstraint"
import { BackgroundGlobals } from "~styles/globals"

export const addClass =
  (
    Component:
      | React.FC<PropsWithChildren<{ className: string }>>
      | StyledComponent<any, any>,
    className: string
  ): React.FC<PropsWithChildren<unknown>> =>
  ({ children }) =>
    <Component className={className}>{children}</Component>

export const mdxComponents = {
  Link: MdxLink,
  Author: withGridConstraint(Author),
  Abstract: withGridConstraint(Abstract),
  Annotation: Annotation,
  Edition: withGridConstraint(Edition),
  Quote: withGridConstraint(Quote),
  ViewportImage: ViewportImage,
  Carousel: Carousel,
  p: withGridConstraint(atoms.p),
  ul: withGridConstraint(atoms.ul),
  ol: withGridConstraint(atoms.ol),
  strong: atoms.strong,
  em: atoms.em,
  del: atoms.del,
  a: atoms.a,
  h1: withGridConstraint(addClass(atoms.h1, "mdx-heading")),
  h2: withGridConstraint(addClass(atoms.h2, "mdx-heading")),
  h3: withGridConstraint(addClass(atoms.h3, "mdx-heading")),
  br: withGridConstraint(() => <br />),
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
}

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.light};
  overflow: initial;

  @media ${devices.desktop} {
    justify-content: center;
    margin: auto;
  }
`

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.light};
`

const Section: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
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

  return (
    <NavMenuProvider>
      <BackgroundGlobals color={theme.palette.light} />
      <HypothesisBtn />
      <NavigationMenu currentPath={location.pathname} />
      <AnnotationProvider>
        <ImagesProvider initialImages={getInitialImages()}>
          {headerImage && <HeaderImage image={headerImage} />}
          <ArticleMenu
            currentPath={location.pathname}
            menus={menus}
            spaced={!headerImage}
          />
          <StyledArticle>
            <StyledLayout flexible className="mdx-section">
              <MDXProvider components={mdxComponents}>
                <SeoMeta
                  title={title}
                  lang={locale}
                  description={mdx.frontmatter.summary}
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
