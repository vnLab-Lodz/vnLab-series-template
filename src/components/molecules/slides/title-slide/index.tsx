import React from "react"
import ReactMarkdown from "react-markdown"
import { slidesMdxComponents } from "src/templates/slides"
import Slide from "../slide"
import * as Styled from "./style"

interface Props {
  background?: string
}

const TitleSlide: React.FC<Props> = ({ children, background }) => (
  <Slide background={background}>
    <Styled.TextContainer>
      {typeof children === "string" ? (
        <ReactMarkdown components={slidesMdxComponents as any}>
          {children?.toString() ?? ""}
        </ReactMarkdown>
      ) : (
        children
      )}
    </Styled.TextContainer>
  </Slide>
)

export default TitleSlide
