import React, { PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import { slidesMdxComponents } from "src/templates/slides"
import * as Styled from "./style"

interface Props {
  className?: string
}

const TextSlide: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <Styled.TextSlideContainer className={className}>
      {typeof children === "string" ? (
        <ReactMarkdown components={slidesMdxComponents as any}>
          {children?.toString() ?? ""}
        </ReactMarkdown>
      ) : (
        children
      )}
    </Styled.TextSlideContainer>
  )
}

export default TextSlide
