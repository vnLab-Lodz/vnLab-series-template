import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import Layout from "~components/organisms/layout"
import Abstract from "~components/molecules/abstract"
import Annotation from "~components/molecules/annotation"
import Quote from "~components/molecules/quote"
import atoms from "~components/atoms"
import Author from "~components/molecules/author"
import Edition from "~components/molecules/edition"
import ArticleMenu from "~components/organisms/article-menu"
import styled, { StyledComponent } from "styled-components"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
import ViewportImage from "~components/molecules/viewport-image"
import HeaderImage from "~components/molecules/header-image"
import ArticleFooter from "~components/organisms/article-footer"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import { isUndefined } from "~util"
import Carousel from "~components/organisms/carousel"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"

const addClass =
  (
    Component: React.FC<{ className: string }> | StyledComponent<any, any>,
    className: string
  ): React.FC =>
  ({ children }) =>
    <Component className={className}>{children}</Component>

export const mdxComponents = {
  Link: MdxLink,
  Author: Author,
  Abstract: Abstract,
  Annotation: Annotation,
  Edition: Edition,
  Quote: Quote,
  ViewportImage: ViewportImage,
  Carousel: Carousel,
  p: atoms.p,
  ul: atoms.ul,
  ol: atoms.ol,
  strong: atoms.strong,
  h1: addClass(atoms.h1, "mdx-heading"),
  h2: addClass(atoms.h2, "mdx-heading"),
  h3: addClass(atoms.h3, "mdx-heading"),
}

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
}

const StyledLayout = styled(Layout)`
  background: ${({ theme: { palette } }) => palette.light};
`

const Section: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
  const { embeddedImagesLocal, headerImage, title } = mdx.frontmatter

  const getInitialImages = (): Image[] => {
    return !isUndefined(headerImage)
      ? [{ imageData: headerImage as IGatsbyImageData, position: 0 }]
      : []
  }

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <AnnotationProvider>
        <ImagesProvider initialImages={getInitialImages()}>
          {headerImage && <HeaderImage image={headerImage} />}
          <ArticleMenu />
          <StyledLayout className="mdx-section">
            <MDXProvider components={mdxComponents}>
              <SeoMeta title={title} />
              <MDXRenderer
                frontmatter={mdx.frontmatter}
                localImages={embeddedImagesLocal}
              >
                {mdx.body}
              </MDXRenderer>
            </MDXProvider>
          </StyledLayout>
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
