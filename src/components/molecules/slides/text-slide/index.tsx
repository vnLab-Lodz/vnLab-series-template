import React from "react"
import ReactMarkdown from "react-markdown"
import { slidesMdxComponents } from "src/templates/slides"
import Slide from "../slide"
import * as Styled from "./style"

interface Props {
  background?: string
}

const TextSlide: React.FC<Props> = ({ children }) => {
  return (
    <Slide>
      <Styled.Container>
        <Styled.Text>
          {typeof children === "string" ? (
            <ReactMarkdown components={slidesMdxComponents as any}>
              {children?.toString() ?? ""}
            </ReactMarkdown>
          ) : (
            children
          )}
        </Styled.Text>
      </Styled.Container>
    </Slide>
  )
}

export default TextSlide
