import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import Slide from "../slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  background?: string
  fit?: "cover" | "contain"
}

const AnnotatedImageSlide: React.FC<Props> = ({
  background,
  image,
  children,
}) => {
  const img = getImage(image) as IGatsbyImageData

  return (
    <Slide background={background}>
      <Styled.SlideContentWrapper>
        <GatsbyImage image={img} objectFit="contain" alt="Slide image" />
        <Styled.SlideAnnotation>
          <ReactMarkdown
            components={
              { ...mdxComponents, p: Styled.AnnotationParagraph } as any
            }
          >
            {children?.toString() ?? ""}
          </ReactMarkdown>
        </Styled.SlideAnnotation>
      </Styled.SlideContentWrapper>
    </Slide>
  )
}

export default AnnotatedImageSlide
