import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import NavMenuProvider, {
  NAV_MODES,
} from "~components/organisms/navigation-menu/nav-menu-context"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import NavigationMenu from "~components/organisms/navigation-menu"
import styled, { ThemeProvider, useTheme } from "styled-components"
import { GridContainer } from "~styles/grid"
import { devices } from "~styles/breakpoints"
import { ImageDataLike } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import SeoMeta from "~components/meta"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { mdxComponents } from "./chapter"
import Slide from "~components/molecules/slides/slide"
import CenterImageSlide from "~components/molecules/slides/center-image-slide"
import TitleSlide from "~components/molecules/slides/title-slide"
import FullscreenImageSlide from "~components/molecules/slides/fullscreen-image-slide"
import TwoImageSlide from "~components/molecules/slides/two-image-slide"
import atoms from "~components/atoms"
import { SwipeEventData } from "react-swipeable"
import VerticalSlides from "~components/molecules/slides/vertical-slides"
import TextSlide from "~components/molecules/slides/text-slide"
import EndSlideOverlay from "~components/organisms/end-slide-overlay"
import { AnimatePresence } from "framer-motion"
import screenfull from "screenfull"
import isSafari from "~util/isSafari"

//@ts-ignore
import Reveal from "reveal.js"
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js"

import "reveal.js/dist/reveal.css"
import "../styles/reveal-theme.css"
import { darkTheme, lightTheme } from "~styles/theme"
import {
  ThemeSwitcherProvider,
  THEME_MODES,
} from "src/context/theme-switcher-context"
import { useLocalization } from "gatsby-theme-i18n"
import { MdxContext } from "src/context/mdx-provider"
import { BackgroundGlobals, GraphicalChapterGlobals } from "~styles/globals"
import AnnotationProvider from "~components/molecules/annotation/annotation-context"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"
import ArticleMenu from "~components/organisms/article-menu"
import { MENUS } from "~types/index"
import ImagesProvider from "src/context/illustrations-context"
import ArticleFooter from "~components/organisms/article-footer"
import SplitSlide from "~components/molecules/slides/split-slide"

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
  footnotes: { nodes: Footnote[] }
}

export const slidesMdxComponents = {
  ...mdxComponents,
  Slide,
  TitleSlide,
  TextSlide,
  CenterImageSlide,
  FullscreenImageSlide,
  SplitSlide,
  //   h1: styled(atoms.h1)`
  //     margin: 8px;
  //     color: ${({ theme }) => theme.palette.white};
  //     font-weight: 300;

  //     @media ${devices.tablet} {
  //       margin-left: 71px;
  //     }
  //   `,
  //   h2: styled(atoms.h2)`
  //     margin: 0;
  //     font-family: ${({ theme }) => theme.typography.fonts.primary};
  //     color: ${({ theme }) => theme.palette.white};

  //     @media ${devices.tablet} {
  //       margin-left: 71px;
  //     }
  //   `,
  //   h3: styled(atoms.h3)`
  //     margin: 0;
  //     font-family: ${({ theme }) => theme.typography.fonts.primary};
  //     color: ${({ theme }) => theme.palette.white};
  //   `,
  //   p: styled(atoms.p)`
  //     color: ${({ theme }) => theme.palette.white};
  //   `,
  //   TwoImageSlide,
  //   VerticalSlides,
}

const Slides: React.FC<PageProps<Data>> = ({ data, location }) => {
  const { mdx, footnotes } = data
  const { title, summary, menus } = mdx.frontmatter
  const images = mdx.frontmatter.embeddedImagesLocal

  const { locale } = useLocalization()

  const mdxContext = useMemo(() => ({ id: mdx.id }), [mdx.id])

  return (
    <ThemeSwitcherProvider defaultMode={THEME_MODES.DARK}>
      <ThemeProvider theme={darkTheme}>
        <NavMenuProvider>
          <SeoMeta
            title={title}
            lang={locale}
            description={summary}
            url={location.pathname}
          />
          <HypothesisBtn />
          <GraphicalChapterGlobals color={darkTheme.palette.light} />
          <MdxContext.Provider value={mdxContext}>
            <NavigationMenu
              currentPath={location.pathname}
              renderProps={{ disableThemeSwitching: true }}
            />
            <FootnotesContext.Provider value={footnotes.nodes}>
              <ImagesProvider>
                <ArticleMenu currentPath={location.pathname} menus={menus} />
                <MDXProvider components={slidesMdxComponents}>
                  <MDXRenderer
                    frontmatter={mdx.frontmatter}
                    localImages={images}
                  >
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
                <ArticleFooterContainer>
                  <ArticleFooter currentPath={location.pathname} />
                </ArticleFooterContainer>
              </ImagesProvider>
            </FootnotesContext.Provider>
          </MdxContext.Provider>
        </NavMenuProvider>
      </ThemeProvider>
    </ThemeSwitcherProvider>
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
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              transformOptions: { cropFocus: ATTENTION }
            )
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

export default Slides

const ArticleFooterContainer = styled.div`
  background: ${({ theme: { palette } }) => palette.light};
  width: 100%;
  scroll-snap-align: end;
`
