import React, { useCallback, useEffect, useRef, useState } from "react"
import NavMenuProvider, {
  NAV_MODES,
} from "~components/organisms/navigation-menu/nav-menu-context"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import { GraphicalVariant as NavigationMenu } from "~components/organisms/navigation-menu"
import styled from "styled-components"
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

//@ts-ignore
import Reveal from "reveal.js"
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js"

import "reveal.js/dist/reveal.css"
import "../styles/reveal-theme.css"

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
      embeddedImagesLocal: ImageDataLike[]
    }
  }
}

export const slidesMdxComponents = {
  ...mdxComponents,
  h1: styled(atoms.h1)`
    margin: 8px;
    color: ${({ theme }) => theme.palette.white};
    font-weight: 300;
  `,
  h2: styled(atoms.h2)`
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts.primary};
    color: ${({ theme }) => theme.palette.white};
  `,
  h3: styled(atoms.h3)`
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts.primary};
    color: ${({ theme }) => theme.palette.white};
  `,
  p: styled(atoms.p)`
    color: ${({ theme }) => theme.palette.white};
  `,
  Slide,
  CenterImageSlide,
  FullscreenImageSlide,
  TitleSlide,
  TwoImageSlide,
  VerticalSlides,
  TextSlide,
}

const Slides: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
  const { embeddedImagesLocal, title } = mdx.frontmatter
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const deck = useRef<any>()

  useEffect(() => {
    deck.current = new Reveal({
      touch: false,
      plugins: [Markdown],
      embedded: true,
      margin: 0,
      width: "100%",
      height: "100%",
      progress: false,
      hash: true,
      history: true,
      controls: false,
    })
    deck.current.initialize()

    const swipeHandler = ({ detail: { dir } }: CustomEvent<SwipeEventData>) => {
      switch (dir) {
        case "Left":
          const isLast = deck.current.isLastSlide()
          setIsOverlayVisible(isLast)
          deck.current.right()
          break
        case "Right":
          deck.current.left()
          break
        case "Up":
          deck.current.down()
          break
        case "Down":
          deck.current.up()
          break
      }
    }

    window.addEventListener("deck_swipe", swipeHandler as EventListener)
    return () => {
      window.removeEventListener("deck_swipe", swipeHandler as EventListener)
    }
  }, [])

  const verifyLastSlideState = useCallback(() => {
    if (!deck.current) return

    const isLast = deck.current.isLastSlide()
    if (!isLast) setIsOverlayVisible(false)
  }, [deck.current])

  const handleKeyBinding = useCallback(
    (method: "right" | "down" | "left" | "up" | "prev" | "next") => () => {
      if (!deck.current) return

      const isHidingMethod = ["left", "up", "prev"].includes(method)
      const isOpeningMethod = ["right", "next"].includes(method)
      const isLast = deck.current.isLastSlide()

      if (isOpeningMethod) setIsOverlayVisible(isLast)

      if (isLast && isOverlayVisible && isHidingMethod) {
        setIsOverlayVisible(false)
        return
      }

      const move = deck.current[method]
      move()

      if (isOpeningMethod) {
        setIsOverlayVisible(isLast && deck.current.isLastSlide())
      }
    },
    [deck.current, isOverlayVisible]
  )

  useEffect(() => {
    if (!deck.current) return

    const rightBinding = handleKeyBinding("right")
    const leftBinding = handleKeyBinding("left")
    const upBinding = handleKeyBinding("up")
    const downBinding = handleKeyBinding("down")
    const prevBinding = handleKeyBinding("prev")
    const nextBinding = handleKeyBinding("next")

    deck.current.addKeyBinding({ keyCode: 39 }, rightBinding)
    deck.current.addKeyBinding({ keyCode: 37 }, leftBinding)
    deck.current.addKeyBinding({ keyCode: 38 }, upBinding)
    deck.current.addKeyBinding({ keyCode: 40 }, downBinding)
    deck.current.addKeyBinding({ keyCode: 80, key: "p" }, prevBinding)
    deck.current.addKeyBinding({ keyCode: 78, key: "n" }, nextBinding)
    deck.current.addKeyBinding({ keyCode: 70, key: "f" }, () => {
      if (screenfull.isEnabled) screenfull.toggle()
    })
    deck.current.on("slidechanged", verifyLastSlideState)
    return () => {
      deck.current.removeKeyBinding(39)
      deck.current.removeKeyBinding(37)
      deck.current.removeKeyBinding(38)
      deck.current.removeKeyBinding(40)
      deck.current.removeKeyBinding(80)
      deck.current.removeKeyBinding(78)
      deck.current.removeKeyBinding(70)
      deck.current.off("slidechanged", verifyLastSlideState)
    }
  }, [deck.current, handleKeyBinding])

  return (
    <NavMenuProvider defaultMode={NAV_MODES.LIGHT}>
      <HypothesisBtn hiddenOnMobile invert={!isOverlayVisible} />
      <NavigationMenu
        currentPath={location.pathname}
        renderProps={{ deck, isOverlayVisible, setIsOverlayVisible }}
      />
      <StyledArticle>
        <StyledLayout noConstraint>
          <RevealContainer className="reveal">
            <div className="slides">
              <MDXProvider components={slidesMdxComponents}>
                <SeoMeta title={title} />
                <MDXRenderer
                  frontmatter={mdx.frontmatter}
                  localImages={embeddedImagesLocal}
                >
                  {mdx.body}
                </MDXRenderer>
              </MDXProvider>
            </div>
            <AnimatePresence>
              {isOverlayVisible && (
                <EndSlideOverlay
                  currentPath={location.pathname}
                  setIsOverlayVisible={setIsOverlayVisible}
                />
              )}
            </AnimatePresence>
          </RevealContainer>
        </StyledLayout>
      </StyledArticle>
    </NavMenuProvider>
  )
}

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.black};
`

const RevealContainer = styled.div.attrs(props => ({
  className: props.className,
}))`
  grid-column: 1 / last-col;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-column: 3 / last-col;
  }
`

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.black};
  overflow: initial;

  grid-template-rows: auto;
  height: 100vh;

  @media ${devices.desktop} {
    justify-content: center;
    margin: auto;
  }
`

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
  }
`

export default Slides
