import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { useContext } from "react"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { AnnotationContext } from "~components/molecules/annotation/annotation-context"
import * as Styled from "./style"

const Annotation: React.FC<{
  index: number
  content: any
  position: number
  closeMenu: () => void
}> = ({ index, content, position, closeMenu }) => {
  return (
    <>
      <Styled.AnnotationNumber>{index}</Styled.AnnotationNumber>
      <Styled.AnnotationParagraph
        onClick={() => {
          closeMenu()
          window.scrollTo({ top: position, behavior: "smooth" })
        }}
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

const Annotations: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const { annotations } = useContext(AnnotationContext)

  return (
    <Styled.AnnotationsGrid>
      {annotations.map(({ index, content, position }) => (
        <Annotation
          key={`inmenu-annotation_${index}`}
          index={index}
          content={content}
          position={position}
          closeMenu={closeMenu}
        />
      ))}
    </Styled.AnnotationsGrid>
  )
}

export default Annotations
