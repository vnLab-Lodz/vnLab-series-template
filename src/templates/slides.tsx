import React, { useMemo } from "react"
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
import { SlideshowChapterGlobals } from "~styles/globals"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"
import { LangKey, MENUS } from "~types/index"
import ImagesProvider from "src/context/illustrations-context"
import ArticleFooter from "~components/organisms/article-footer"
import SplitSlide from "~components/molecules/slides/split-slide"
import CarouselSlide from "~components/molecules/slides/carousel-slide"
import ViewportImageSlide from "~components/molecules/slides/viewport-image-slide"
import SoundCloudPlayer from "~components/molecules/soundcloud-player"
import VimeoIframe from "~components/molecules/viemo-iframe"
import Video from "~components/molecules/video"
import FullscreenDialog from "~components/molecules/fullscreen-dialog"
import { AudioPlayer } from "~components/molecules/audio-player"
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
  AudioPlayer,
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
            lang={locale as LangKey}
            description={summary}
            url={location.pathname}
          />
          <HypothesisBtn />
          <SlideshowChapterGlobals color={darkTheme.palette.light} />
          <MdxContext.Provider value={mdxContext}>
            <NavigationMenu
              currentPath={location.pathname}
              renderProps={{
                disableThemeSwitching: true,
                enableFullscreen: true,
              }}
              independentHiding
            />
            <FootnotesContext.Provider value={footnotes.nodes}>
              <ImagesProvider>
                <MDXProvider components={slidesMdxComponents}>
                  <MDXRenderer
                    frontmatter={mdx.frontmatter}
                    localImages={images}
                  >
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
                <FullscreenDialog />
                <ArticleFooterContainer className="slide">
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
      sort: { fields: index }
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
