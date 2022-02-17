import { AnimatePresence } from "framer-motion"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { CaptionPortal } from "~components/molecules/viewport-image"
import Slide from "../slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  background?: string
  fit?: "cover" | "contain"
  caption: string
}

const components = { ...mdxComponents, p: Styled.AnnotationParagraph } as any

const AnnotatedImageSlide: React.FC<Props> = ({
  background,
  image,
  children,
  caption,
}) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const img = getImage(image) as IGatsbyImageData

  return (
    <Slide background={background}>
      <Styled.SlideContentWrapper ref={ref}>
        <GatsbyImage image={img} objectFit="contain" alt="Slide image" />
        <Styled.SlideAnnotation2>
          <ReactMarkdown components={components}>{caption}</ReactMarkdown>
          {!!children && (
            <Styled.ExpandCaptionButton onClick={() => setOpen(true)}>
              {t("expand")}
            </Styled.ExpandCaptionButton>
          )}
        </Styled.SlideAnnotation2>
      </Styled.SlideContentWrapper>
      <AnimatePresence>
        {open && (
          <CaptionPortal
            caption={caption}
            toggle={() => setOpen(false)}
            position={0}
            target={ref.current ?? undefined}
          >
            {children}
          </CaptionPortal>
        )}
      </AnimatePresence>
    </Slide>
  )
}

export default AnnotatedImageSlide
