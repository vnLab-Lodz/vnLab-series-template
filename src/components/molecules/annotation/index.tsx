import React, { useEffect, useRef, useState, useContext } from "react"
import ReactDOM from "react-dom"
import * as Styled from "./style"

//@ts-ignore
import XSVG from "../../../images/icons/x.svg"
import { AnnotationContext } from "./annotation-context"

interface Props {
  target: string
}

interface PortalProps {
  index: number
  position: number | undefined
  toggle: () => void
}

const AnnotationPortal: React.FC<PortalProps> = ({
  index,
  children,
  position,
  toggle,
}) => {
  return ReactDOM.createPortal(
    <Styled.AnnotationContent as="article" style={{ top: `${position}px` }}>
      <Styled.CloseBtn onClick={toggle}>
        <img src={XSVG} alt="Close" />
      </Styled.CloseBtn>
      <Styled.AnnotationNumber>{index}</Styled.AnnotationNumber>
      <Styled.AnnotationParagraph>{children}</Styled.AnnotationParagraph>
    </Styled.AnnotationContent>,
    document.body
  )
}

const Annotation: React.FC<Props> = ({ target, children }) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLSpanElement | null>(null)
  const { annotations, addAnnotation } = useContext(AnnotationContext)
  const annotation = annotations.find(a => a.target === target)

  const calculatePosition = () => {
    if (!ref || !ref.current) return

    const doc = document.documentElement
    const elementRect = ref.current.getBoundingClientRect()
    const parentRect = ref.current.parentElement?.getBoundingClientRect()
    const offset = parentRect?.height ?? elementRect.height

    setPosition(elementRect.top + doc.scrollTop + offset)
  }

  useEffect(() => {
    calculatePosition()
  }, [ref])

  useEffect(() => {
    if (
      children &&
      ref &&
      typeof position === "number" &&
      !annotations.find(
        a => a.target === target && a.content === children.toString()
      )
    )
      addAnnotation(target, children.toString(), position as number)
  }, [ref, position])

  const toggleAnnotation = () => setOpen(prev => !prev)

  const handleIndexClick = () => {
    calculatePosition()
    toggleAnnotation()
  }

  return (
    <Styled.AnnotationTarget>
      {target}
      <Styled.AnnotationIndex ref={ref} onClick={handleIndexClick}>
        {annotation?.index}
      </Styled.AnnotationIndex>
      {open && (
        <AnnotationPortal
          index={annotation?.index ?? 0}
          position={position}
          toggle={toggleAnnotation}
        >
          {children}
        </AnnotationPortal>
      )}
    </Styled.AnnotationTarget>
  )
}

export default Annotation
