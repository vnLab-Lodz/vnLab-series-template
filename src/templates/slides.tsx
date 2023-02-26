import React, { useEffect, useMemo } from "react"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import NavigationMenu from "~components/organisms/navigation-menu"
import styled, { ThemeProvider } from "styled-components"
import { ImageDataLike } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import SeoMeta from "~components/molecules/seo-meta"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { mdxComponents } from "./chapter"
import Slide from "~components/molecules/slides/slide"
import CenterImageSlide from "~components/molecules/slides/center-image-slide"
import TitleSlide from "~components/molecules/slides/title-slide"
import FullscreenImageSlide from "~components/molecules/slides/fullscreen-image-slide"
import TextSlide from "~components/molecules/slides/text-slide"
import { darkTheme } from "~styles/theme"
import {
  ThemeSwitcherProvider,
  THEME_MODES,
} from "src/context/theme-switcher-context"
import { useLocalization } from "gatsby-theme-i18n"
import { MdxContext } from "src/context/mdx-provider"
import { GraphicalChapterGlobals } from "~styles/globals"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"
import ArticleMenu from "~components/organisms/article-menu"
import { LangKey, MENUS } from "~types/index"
import ImagesProvider from "src/context/illustrations-context"
import ArticleFooter from "~components/organisms/article-footer"
import SplitSlide from "~components/molecules/slides/split-slide"
import CarouselSlide from "~components/molecules/slides/carousel-slide"
import ViewportImageSlide from "~components/molecules/slides/viewport-image-slide"
import SoundCloudPlayer from "~components/molecules/soundcloud-player"
import VimeoIframe from "~components/molecules/viemo-iframe"
import Video from "~components/molecules/video"
import { flushSync } from "react-dom"

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
  CarouselSlide,
  ViewportImageSlide,
  SoundCloudPlayer,
  VimeoIframe,
  Video,
}

const Slides: React.FC<PageProps<Data>> = ({ data, location }) => {
  const { mdx, footnotes } = data
  const { title, summary, menus } = mdx.frontmatter
  const images = mdx.frontmatter.embeddedImagesLocal

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    let element: HTMLElement | undefined

    const listener = () => {
      if (timeout) window.clearTimeout(timeout)
      timeout = setTimeout(() => {
        flushSync(() => {
          if (!element) return

          const top = element.offsetTop
          window.scrollTo({ top, behavior: "smooth" })
        })
      }, 66)
    }

    const keyboardListener = (e: KeyboardEvent) => {
      if (!element) return
      let sibling: Element | null = null

      switch (e.key) {
        case "ArrowUp":
          sibling = element.previousElementSibling
          break
        case "ArrowDown":
          sibling = element.nextElementSibling
          break
      }

      if (!sibling) return
      element = sibling as HTMLElement
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const node = entry.target as HTMLElement
          if (node.offsetTop !== 0) return (element = node)

          // Handling split slides
          if (!node.parentElement?.parentElement) return
          element = node.parentElement.parentElement
        }),
      { threshold: [0.1] }
    )

    const selector = '.slide:not([data-ignore-slide="true"])'
    const nodes = document.querySelectorAll(selector)
    nodes.forEach(node => observer.observe(node))
    window.addEventListener("scroll", listener)
    window.addEventListener("keydown", keyboardListener)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", listener)
      window.removeEventListener("keydown", keyboardListener)
    }
  }, [])

  const { locale } = useLocalization()

  const mdxContext = useMemo(() => ({ id: mdx.id }), [mdx.id])

  return (
    <ThemeSwitcherProvider defaultMode={THEME_MODES.DARK}>
      <ThemeProvider theme={darkTheme}>
        <NavMenuProvider>
          <SeoMeta
            title={title}
            lang={locale as LangKey}
            description={summary}
            url={location.pathname}
          />
          <HypothesisBtn />
          <GraphicalChapterGlobals color={darkTheme.palette.light} />
          <noscript>
            <style>{`html { scroll-snap-type: y mandatory; }`}</style>
          </noscript>
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
