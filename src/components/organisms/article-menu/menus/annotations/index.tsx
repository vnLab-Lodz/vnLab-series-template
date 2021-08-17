import React from "react"
import { useContext } from "react"
import { AnnotationContext } from "~components/molecules/annotation/annotation-context"
import * as Styled from "./style"

const Annotation: React.FC<{ index: number; content: string }> = ({
  index,
  content,
}) => (
  <>
    <Styled.AnnotationNumber>{index}</Styled.AnnotationNumber>
    <Styled.AnnotationParagraph>{content}</Styled.AnnotationParagraph>
  </>
)

const Annotations = () => {
  const { annotations } = useContext(AnnotationContext)

  return (
    <Styled.AnnotationsGrid>
      {annotations.map(({ index, content }) => (
        <Annotation
          index={index}
          content={content}
          key={`inmenu-annotation_${index}`}
        />
      ))}
    </Styled.AnnotationsGrid>
  )
}

export default Annotations
