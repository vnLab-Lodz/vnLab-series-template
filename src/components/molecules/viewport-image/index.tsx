import React, { useState, useRef, useEffect, useContext } from "react"
import { ImagesContext } from "src/context/illustrations-context"
import ReactDOM from "react-dom"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as Styled from "./style"

//@ts-ignore
import XSVG from "../../../images/icons/x.svg"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { MDXProvider } from "@mdx-js/react"
import useIsMobile from "src/hooks/useIsMobile"
import { GatsbyImage } from "gatsby-plugin-image"
import useScrollDistance from "src/hooks/useScrollDistance"

interface Props {
  image: IGatsbyImageData
  caption: string
}

interface PortalProps {
  toggle: () => void
  position: number
  caption: string
}

const CaptionPortal: React.FC<PortalProps> = ({
  children,
  position,
  toggle,
  caption,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return ReactDOM.createPortal(
    <Styled.CaptionContent
      ref={ref}
      as="article"
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
        <Styled.CaptionParagraph as="div">
          <ReactMarkdown
            components={{ ...mdxComponents, p: Styled.CaptionParagraph } as any}
          >
            {children}
          </ReactMarkdown>
        </Styled.CaptionParagraph>
      ) : (
        <Styled.CaptionParagraph>
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </Styled.CaptionParagraph>
      )}
    </Styled.CaptionContent>,
    document.body
  )
}

const ViewportImage: React.FC<Props> = ({ image, children, caption }) => {
  const captionRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  const [position, setPosition] = useState<number | undefined>(undefined)
  const [constraintHeight, setConstraintHeight] = useState<string>("100vh")
  const [open, setOpen] = useState<boolean | undefined>(undefined)
  const [navMenuWidth, setNavMenuWidth] = useState<number>(0)
  const [wrapperOffset, setWrapperOffset] = useState(0)

  const isMobile = useIsMobile()

  const { addImage } = useContext(ImagesContext)
  const { t } = useTranslation("common")

  const [inViewRef, isInView] = useInView({ threshold: 0.85 })
  const scrollRef = useRef<number>(0)
  const isScrolling = useRef(false)

  const onScroll = () => {
    const currentScrollPos = window.pageYOffset

    if (scrollRef.current >= currentScrollPos) isScrolling.current = true

    scrollRef.current = currentScrollPos
  }

  const onScrollEnd = useScrollDistance(() => {
    isScrolling.current = false
  })

  const calculatePosition = () => {
    if (!ref || !ref.current) return

    const { offsetTop, offsetHeight } = ref.current
    const offset = offsetTop + offsetHeight
    const doc = document.documentElement

    setPosition(doc.clientHeight - offset)
  }

  const calculateScrollPosition = () => {
    if (!ref || !ref.current) return 0

    return ref.current.offsetTop
  }

  const calculateWrapperOffset = () => {
    if (!ref || !ref.current) return

    const { offsetLeft } = ref.current
    setWrapperOffset(-offsetLeft)
  }

  const handleClick = () => {
    calculatePosition()
    setOpen(true)
  }

  const setConstraints = () => {
    if (
      !imageRef.current ||
      !captionRef.current ||
      constraintHeight !== "100vh"
    )
      return

    const height = imageRef.current.clientHeight
    const captionHeight = captionRef.current.clientHeight
    const constraint = `calc(${height + captionHeight}px + 2 *var(--space-xs))`

    setConstraintHeight(constraint)
  }

  const resetConstraint = () => {
    setConstraintHeight("100vh")
  }

  const getNavMenuWidth = () => {
    if (isMobile) {
      setNavMenuWidth(0)
      return
    }

    const el = document.getElementById("menu-nav")
    if (el) setNavMenuWidth(el.clientWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", resetConstraint)
    return () => window.removeEventListener("resize", resetConstraint)
  }, [])

  useEffect(() => {
    calculatePosition()
    addImage(image, calculateScrollPosition())
    inViewRef(ref.current)
    calculateWrapperOffset()
    window.addEventListener("resize", calculateWrapperOffset)

    return () => {
      window.removeEventListener("resize", calculateWrapperOffset)
    }
  }, [ref])

  useEffect(() => {
    getNavMenuWidth()
    window.addEventListener("resize", getNavMenuWidth)

    return () => window.removeEventListener("resize", getNavMenuWidth)
  }, [isMobile])

  useEffect(setConstraints, [imageRef, constraintHeight])

  useEffect(() => {
    if (!ref.current || !isInView || isScrolling.current) return

    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })
  }, [isInView])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    window.addEventListener("scroll", onScrollEnd)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scroll", onScrollEnd)
    }
  }, [])

  const img = getImage(image) as IGatsbyImageData

  const aspectRatio = `${img.width}/${img.height}`

  return (
    <Styled.ViewportConstraint
      as={motion.div}
      ref={ref}
      style={{ height: constraintHeight }}
    >
      <Styled.Absolute>
        <Styled.ImageWrapper
          ref={imageRef}
          style={{
            transform: `translateX(${wrapperOffset}px)`,
            width: `calc(100vw - ${navMenuWidth}px)`,
            marginLeft: `${navMenuWidth}px`,
          }}
        >
          <GatsbyImage
            objectFit="contain"
            image={img}
            alt=""
            style={{ aspectRatio }}
          />
        </Styled.ImageWrapper>
        <Styled.Caption ref={captionRef}>
          <Styled.CaptionText as="div">
            <ReactMarkdown
              components={{ ...mdxComponents, p: Styled.CaptionText } as any}
            >
              {caption}
            </ReactMarkdown>
          </Styled.CaptionText>
          <Styled.ExpandCaptionBtn onClick={handleClick}>
            {t("expand")}
          </Styled.ExpandCaptionBtn>
        </Styled.Caption>
        {open && position && (
          <CaptionPortal
            caption={caption}
            toggle={() => setOpen(false)}
            position={position}
          >
            {children}
          </CaptionPortal>
        )}
      </Styled.Absolute>
    </Styled.ViewportConstraint>
  )
}

export default ViewportImage
