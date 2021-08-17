import React from "react"
import { useContext } from "react"
import { AnnotationContext } from "~components/molecules/annotation/annotation-context"
import * as Styled from "./style"

const Annotations = () => {
  const { annotations } = useContext(AnnotationContext)

  return (
    <Styled.AnnotationsGrid>
      {annotations.map(annotation => (
        <>
          <Styled.AnnotationNumber>{annotation.index}</Styled.AnnotationNumber>
          <Styled.AnnotationParagraph>
            {annotation.content}
          </Styled.AnnotationParagraph>
        </>
      ))}
    </Styled.AnnotationsGrid>
  )
}

export default Annotations
