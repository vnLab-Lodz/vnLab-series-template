import React, { useEffect } from "react"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import HypothesisBtn from "~components/molecules/hypothesis-btn"
import NavigationMenu from "~components/organisms/navigation-menu"
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
import TextSlide from "~components/molecules/slides/text-slide"
import FullscreenImageSlide from "~components/molecules/slides/fullscreen-image-slide"
import TwoImageSlide from "~components/molecules/slides/two-image-slide"
import AnnotatedImageSlide from "~components/molecules/slides/annotated-image-slide"
import atoms from "~components/atoms"
import { SwipeEventData } from "react-swipeable"

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

const components = {
  ...mdxComponents,
  h1: styled(atoms.h1)`
    margin: 0;
  `,
  h2: styled(atoms.h2)`
    margin: 0;
  `,
  p: atoms.p,
  Slide,
  CenterImageSlide,
  FullscreenImageSlide,
  TextSlide,
  TwoImageSlide,
  AnnotatedImageSlide,
}

const Slides: React.FC<PageProps<Data>> = ({ data: { mdx }, location }) => {
  const { embeddedImagesLocal, title } = mdx.frontmatter

  useEffect(() => {
    const deck = new Reveal({
      touch: false,
      plugins: [Markdown],
      embedded: true,
      margin: 0,
      width: "100%",
      height: "100%",
      progress: false,
    })
    deck.initialize()

    const swipeHandler = ({ detail: { dir } }: CustomEvent<SwipeEventData>) => {
      switch (dir) {
        case "Left":
          deck.right()
          break
        case "Right":
          deck.left()
          break
        case "Up":
          deck.down()
          break
        case "Down":
          deck.up()
          break
      }
    }

    window.addEventListener("deck_swipe", swipeHandler as EventListener)
    return () => {
      window.removeEventListener("deck_swipe", swipeHandler as EventListener)
    }
  }, [])

  return (
    <NavMenuProvider>
      <HypothesisBtn left />
      <NavigationMenu currentPath={location.pathname} />
      <StyledArticle>
        <StyledLayout>
          <RevealContainer className="reveal">
            <div className="slides">
              <MDXProvider components={components}>
                <SeoMeta title={title} />
                <MDXRenderer
                  frontmatter={mdx.frontmatter}
                  localImages={embeddedImagesLocal}
                >
                  {mdx.body}
                </MDXRenderer>
              </MDXProvider>
            </div>
          </RevealContainer>
        </StyledLayout>
      </StyledArticle>
    </NavMenuProvider>
  )
}

const StyledArticle = styled.article`
  background: ${({ theme: { palette } }) => palette.light};
`

const RevealContainer = styled.div.attrs(props => ({
  className: props.className,
}))`
  grid-column: 1 / last-col;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-column 3 / last-col;
  }
`

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.light};
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
