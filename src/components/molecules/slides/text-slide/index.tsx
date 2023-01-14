import React, { PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import { slidesMdxComponents } from "src/templates/slides"
import * as Styled from "./style"

interface Props {
  background?: string
}

const TextSlide: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Styled.SlideContainer>
      {typeof children === "string" ? (
        <ReactMarkdown components={slidesMdxComponents as any}>
          {children?.toString() ?? ""}
        </ReactMarkdown>
      ) : (
        children
      )}
    </Styled.SlideContainer>
  )
}

export default TextSlide
