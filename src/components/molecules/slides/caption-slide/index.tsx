import React, { useEffect, useRef, useState, PropsWithChildren } from "react"
import { AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { CaptionPortal } from "~components/molecules/viewport-image"
import Slide from "../slide"
import * as Styled from "./style"

export type CaptionProps = {
  caption?: string
  extendedCaption?: string
}

interface Props extends CaptionProps {
  background?: string
  disableSwipe?: boolean
  fullscreen?: boolean
}

const components = { ...mdxComponents, p: Styled.CaptionParagraph } as any

const CaptionSlide: React.FC<PropsWithChildren<Props>> = ({
  extendedCaption,
  disableSwipe,
  background,
  fullscreen,
  children,
  caption,
}) => {
  const { t } = useTranslation("common")

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  const expandCaption = () => {
    const position = calculatePosition()
    setPosition(position)
    setOpen(true)
  }

  const minimizeCaption = () => setOpen(false)

  const calculatePosition = () => {
    if (!ref || !ref.current) return 0

    const bodyHeight = document.body.clientHeight
    const captionHeight = ref.current.offsetHeight

    return bodyHeight - captionHeight
  }

  useEffect(() => {
    const determinePosition = () => {
      const position = calculatePosition()
      setPosition(position)
    }

    determinePosition()
    window.addEventListener("resize", determinePosition)
    return () => {
      window.removeEventListener("resize", determinePosition)
    }
  }, [ref])

  return (
    <Slide>
      <Styled.SlideWrapper
        ref={ref}
        withPadding={!caption}
        fullscreen={fullscreen}
      >
        <Styled.SlideContainer fullscreen={fullscreen}>
          {children}
        </Styled.SlideContainer>
        {!!caption && (
          <Styled.SlideCaption centered={!!caption && !extendedCaption}>
            <ReactMarkdown components={components}>{caption}</ReactMarkdown>
            {!!extendedCaption && (
              <Styled.ExpandCaptionButton onClick={expandCaption}>
                {t("expand")}
              </Styled.ExpandCaptionButton>
            )}
          </Styled.SlideCaption>
        )}
        <AnimatePresence>
          {open && !!caption && (
            <CaptionPortal
              caption={caption}
              toggle={minimizeCaption}
              position={position}
              target={ref.current ?? undefined}
            >
              {extendedCaption}
            </CaptionPortal>
          )}
        </AnimatePresence>
      </Styled.SlideWrapper>
    </Slide>
  )
}

export default CaptionSlide
