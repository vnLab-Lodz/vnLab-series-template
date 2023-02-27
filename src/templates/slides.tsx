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
    if (!mobileAndTabletCheck() || isSafari()) return

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
          <ScrollSnapStyles />
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
                <ArticleFooterContainer
                  className="slide"
                  data-mobile={mobileAndTabletCheck()}
                >
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

  &[data-mobile="true"] {
    height: 90vh;
  }
`

const ScrollSnapStyles = () => {
  const style = <style>{`html { scroll-snap-type: y mandatory; }`}</style>

  if (!mobileAndTabletCheck() || isSafari()) return style

  return <noscript>{style}</noscript>
}

const isSafari = () => {
  if (typeof navigator === "undefined") return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

const mobileAndTabletCheck = () => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false
  }

  let check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
    // @ts-ignore
  })(navigator?.userAgent || navigator?.vendor || window?.opera)
  return check
}
