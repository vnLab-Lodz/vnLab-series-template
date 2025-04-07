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
import Slide from "~components/molecules/graphical-components/slide"
import CenterImageSlide from "~components/molecules/graphical-components/center-image-slide"
import TitleSlide from "~components/molecules/graphical-components/title-slide"
import FullscreenImageSlide from "~components/molecules/graphical-components/fullscreen-image-slide"
import TextSlide from "~components/molecules/graphical-components/text-slide"
import { darkTheme } from "~styles/theme"
import {
  ThemeSwitcherProvider,
  THEME_MODES,
} from "src/context/theme-switcher-context"
import { useLocalization } from "gatsby-theme-i18n"
import { MdxContext } from "src/context/mdx-provider"
import { GraphicalChapterGlobals } from "~styles/globals"
import { Footnote, FootnotesContext } from "src/context/footnotes-context"
import { LangKey, MENUS } from "~types/index"
import ImagesProvider from "src/context/illustrations-context"
import ArticleFooter from "~components/organisms/article-footer"
import SplitSlide from "~components/molecules/graphical-components/split-slide"
import CarouselSlide from "~components/molecules/graphical-components/carousel-slide"
import ViewportImageSlide from "~components/molecules/graphical-components/viewport-image-slide"
import SoundCloudPlayer from "~components/molecules/soundcloud-player"
import VimeoIframe from "~components/molecules/viemo-iframe"
import Video from "~components/molecules/video"
import FullscreenDialog from "~components/molecules/fullscreen-dialog"
import {
  Grid,
  GridRow,
  GridColumn,
  FullscreenGridColumn,
  FullWidthGridColumn,
  GridImage,
} from "~components/molecules/graphical-components/image-grid"
import {
  AudioPlayer,
  GlobalAudioPlayer,
} from "~components/molecules/audio-player"
import { AudioPlayerProvider } from "~components/molecules/audio-player/context"
import { FileSystemNode } from "gatsby-source-filesystem"

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
      embeddedImagesLocal: ImageDataLike[]
      embeddedAudioLocal: {
        src: FileSystemNode
        title: string
        author?: string
      }[]
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
  Grid,
  GridRow,
  GridColumn,
  FullscreenGridColumn,
  FullWidthGridColumn,
  GridImage,
  AudioPlayer,
}

const Graphical: React.FC<PageProps<Data>> = ({ data, location }) => {
  const { mdx, footnotes } = data
  const { title, summary, embeddedAudioLocal } = mdx.frontmatter
  const images = mdx.frontmatter.embeddedImagesLocal

  const { locale } = useLocalization()

  const mdxContext = useMemo(() => ({ id: mdx.id }), [mdx.id])

  const tracks = useMemo(() => {
    if (!embeddedAudioLocal) return []

    return embeddedAudioLocal.map(audio => ({
      src: audio.src.publicURL as string,
      title: audio.title,
      author: audio.author,
    }))
  }, [embeddedAudioLocal])

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
          <GraphicalChapterGlobals color={darkTheme.palette.light} />
          <HypothesisBtn />
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
                <AudioPlayerProvider tracks={tracks}>
                  <MDXProvider components={slidesMdxComponents}>
                    <MDXRenderer
                      frontmatter={mdx.frontmatter}
                      localImages={images}
                      localAudio={embeddedAudioLocal}
                    >
                      {mdx.body}
                    </MDXRenderer>
                  </MDXProvider>
                  <FullscreenDialog />
                  <ArticleFooterContainer className="slide">
                    <ArticleFooter currentPath={location.pathname} />
                  </ArticleFooterContainer>
                  <GlobalAudioPlayer />
                </AudioPlayerProvider>
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
        embeddedAudioLocal {
          src {
            publicURL
          }
          title
          author
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

export default Graphical

const ArticleFooterContainer = styled.div`
  background: ${({ theme: { palette } }) => palette.light};
  width: 100%;
`
