import React from "react"
import { useContext } from "react"
import { AnnotationContext } from "~components/molecules/annotation/annotation-context"
import * as Styled from "./style"

const Annotation: React.FC<{
  index: number
  content: string
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
        {content}
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
