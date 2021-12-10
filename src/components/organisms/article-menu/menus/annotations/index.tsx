import { MDXProvider } from "@mdx-js/react"
import React from "react"
import ReactMarkdown from "react-markdown"
import useIsMobile from "src/hooks/useIsMobile"
import { mdxComponents } from "src/templates/chapter"
import { Annotation as AnnotationType } from "~components/molecules/annotation/annotation-context"
import * as Styled from "./style"

const Annotation: React.FC<{
  index: number
  content: any
  position: number
  closeMenu: (callback?: () => void) => void
  scrollIntoView?: () => void
}> = ({ index, content, position, closeMenu, scrollIntoView }) => {
  const isMobile = useIsMobile()
  // * Offset the width of the menu bar on mobile
  const scrollOffset = isMobile ? 70 : 0

  return (
    <>
      <Styled.AnnotationNumber>{index}</Styled.AnnotationNumber>
      <Styled.AnnotationParagraph
        onClick={() =>
          closeMenu(() => {
            if (scrollIntoView) {
              scrollIntoView()
              return
            }

            window.scrollTo({
              top: position - scrollOffset,
              behavior: "smooth",
            })
          })
        }
      >
        {typeof content === "string" ? (
          <ReactMarkdown
            components={{ ...mdxComponents, p: Styled.InheritParagraph } as any}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <MDXProvider components={mdxComponents}>{content}</MDXProvider>
        )}
      </Styled.AnnotationParagraph>
    </>
  )
}

const Annotations: React.FC<{
  closeMenu: (callback?: () => void) => void
  annotations: AnnotationType[]
}> = ({ closeMenu, annotations }) => (
  <Styled.AnnotationsGrid>
    {annotations.map(({ index, content, position, scrollIntoView }) => (
      <Annotation
        key={`inmenu-annotation_${index}`}
        index={index}
        content={content}
        position={position}
        closeMenu={closeMenu}
        scrollIntoView={scrollIntoView}
      />
    ))}
  </Styled.AnnotationsGrid>
)

export default Annotations
