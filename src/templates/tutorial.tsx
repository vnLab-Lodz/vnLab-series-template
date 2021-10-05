import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import Layout from "~components/organisms/layout"
import ArticleMenu from "~components/organisms/article-menu"
import styled from "styled-components"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
import HeaderImage from "~components/molecules/header-image"
import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import { isUndefined } from "~util"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import ImagesProvider, { Image } from "src/context/illustrations-context"
import { devices } from "~styles/breakpoints"
import { mdxComponents } from "./chapter"
import HypothesisBtn from "~components/molecules/hypothesis-btn"

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

const StyledArticleMenu = styled(ArticleMenu)`
  background-color: ${({ theme }) => theme.palette.quaternary};
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
      <HypothesisBtn />
      <NavigationMenu currentPath={location.pathname} />
      <AnnotationProvider>
        <ImagesProvider initialImages={getInitialImages()}>
          {headerImage && <HeaderImage image={headerImage} />}
          <StyledArticleMenu noBibliography currentPath={location.pathname} />
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
