import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react"
import { ImagesContext } from "src/context/illustrations-context"
import ReactDOM from "react-dom"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as Styled from "./style"
import { GridConstraint } from "~styles/grid"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { MDXProvider } from "@mdx-js/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { ThemeProvider, useTheme } from "styled-components"
import lightTheme from "~styles/theme"

import XSVG from "../../../images/icons/x.svg"
import ExpandArrow from "src/images/icons/arrow_expand.svg"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import Fullsize from "../fullsize"

interface Props {
  image: IGatsbyImageData
  caption: string
}

interface PortalProps {
  toggle: () => void
  position: number
  caption: string
  target?: HTMLElement
}

export const CaptionPortal: React.FC<PropsWithChildren<PortalProps>> = ({
  children,
  position,
  toggle,
  caption,
  target,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return ReactDOM.createPortal(
    <ThemeProvider theme={lightTheme}>
      <Styled.CaptionContent
        ref={ref}
        as={motion.article}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ bottom: `${position}px` }}
      >
        <Styled.CaptionHeader as="div">
          <ReactMarkdown
            components={{ ...mdxComponents, p: Styled.CaptionHeader } as any}
          >
            {caption}
          </ReactMarkdown>
        </Styled.CaptionHeader>
        <Styled.CloseBtn onClick={toggle}>
          <img src={XSVG} alt="Close" />
        </Styled.CloseBtn>
        {typeof children === "string" ? (
          <Styled.CaptionParagraph as="div" padded={!!children}>
            <ReactMarkdown
              components={
                { ...mdxComponents, p: Styled.CaptionParagraph } as any
              }
            >
              {children}
            </ReactMarkdown>
          </Styled.CaptionParagraph>
        ) : (
          <Styled.CaptionParagraph padded={!!children}>
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </Styled.CaptionParagraph>
        )}
      </Styled.CaptionContent>
    </ThemeProvider>,
    target ?? document.body
  )
}

const ViewportImage: React.FC<PropsWithChildren<Props>> = ({
  image,
  children,
  caption,
}) => {
  const captionRef = useRef<HTMLDivElement | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)

  const [position, setPosition] = useState<number | undefined>(undefined)
  const [open, setOpen] = useState<boolean | undefined>(undefined)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const { themeMode } = useThemeSwitcherContext()

  const controls = useAnimation()

  const [inViewRef, isInView] = useInView({ threshold: 0.1 })
  const { addImage } = useContext(ImagesContext)
  const { t } = useTranslation("common")

  const calculatePosition = () => {
    if (!stickyRef || !stickyRef.current) return

    const { offsetTop, offsetHeight } = stickyRef.current
    const offset = offsetTop + offsetHeight
    const doc = document.documentElement

    setPosition(doc.clientHeight - offset)
  }

  const calculateScrollPosition = () => {
    if (!stickyRef || !stickyRef.current) return 0

    return stickyRef.current.offsetTop
  }

  const handleClick = () => {
    calculatePosition()
    setOpen(true)
  }

  const isExpandShown = () => {
    if (caption.length > 150) return true

    if (!children) return false

    return children.toString().length > 0
  }

  const getFormattedCaption = () => {
    if (caption.length <= 150) return caption

    return caption.slice(0, 150) + "..."
  }

  useEffect(() => inViewRef(ref.current), [ref])

  useEffect(() => {
    const timeout = setTimeout(() => {
      addImage(image, calculateScrollPosition, () =>
        stickyRef.current?.scrollIntoView({ behavior: "smooth" })
      )
    }, 66)

    return () => clearTimeout(timeout)
  }, [stickyRef])

  useEffect(() => {
    if (!stickyRef.current) return setSticky(isInView)

    const proportions = stickyRef.current.offsetHeight / window.innerHeight

    if (proportions > 0.85) setSticky(true)
    else setSticky(false)
  }, [stickyRef.current])

  useEffect(() => {
    const marginBottom = sticky ? "100px" : "0px"
    const duration = sticky ? 0.1 : 0.2

    controls.start({ marginBottom, transition: { duration, ease: "easeIn" } })
  }, [sticky])

  const img = getImage(image) as IGatsbyImageData

  const filter = themeMode === THEME_MODES.DARK ? "invert(1)" : "none"

  return (
    <>
      <Styled.ViewportConstraint
        ref={ref}
        animate={controls}
        className="viewport-image"
      >
        <Styled.Absolute ref={stickyRef} sticky={sticky}>
          <Styled.ImageWrapper $withVerticalPadding={!caption}>
            <GatsbyImage
              objectFit="contain"
              image={img}
              alt={caption ?? "Viewport image without a caption"}
            />
          </Styled.ImageWrapper>
          {caption && (
            <GridConstraint>
              <Styled.Caption ref={captionRef}>
                <Styled.CaptionText as="div">
                  <ReactMarkdown
                    components={
                      { ...mdxComponents, p: Styled.CaptionText } as any
                    }
                  >
                    {getFormattedCaption()}
                  </ReactMarkdown>
                </Styled.CaptionText>
                <Styled.Expand onClick={() => setIsFullscreen(true)}>
                  <img
                    src={ExpandArrow}
                    alt="Fullsize"
                    style={{ filter, height: 16, width: 16 }}
                  />
                </Styled.Expand>
                {isExpandShown() && (
                  <Styled.ExpandCaptionBtn onClick={handleClick}>
                    {t("expand")}
                  </Styled.ExpandCaptionBtn>
                )}
              </Styled.Caption>
              <AnimatePresence>
                {open && position && (
                  <CaptionPortal
                    caption={caption}
                    toggle={() => setOpen(false)}
                    position={position}
                  >
                    {children}
                  </CaptionPortal>
                )}
              </AnimatePresence>
            </GridConstraint>
          )}
        </Styled.Absolute>
      </Styled.ViewportConstraint>
      {isFullscreen ? (
        <Fullsize
          image={img}
          alt={caption ?? "Viewport image without a caption"}
          close={() => setIsFullscreen(false)}
        />
      ) : null}
    </>
  )
}

export default ViewportImage
