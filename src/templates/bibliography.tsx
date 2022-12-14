import React, { useMemo } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import Layout from "~components/organisms/layout"
import styled, { useTheme } from "styled-components"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
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

const Section: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
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
        <AnnotationProvider>
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
        </AnnotationProvider>
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
  }
`

export default Section
