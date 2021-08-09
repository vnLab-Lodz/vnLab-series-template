import React, { CSSProperties } from "react"
import * as Styled from "./style"

interface Props {
  style?: CSSProperties
  author?: string
}

const Quote: React.FC<Props> = ({ children, author, style }) => {
  return (
    <Styled.QuoteContainer style={style}>
      <Styled.QuoteText>{children}</Styled.QuoteText>
      {author && <Styled.Author type="primary">{author}</Styled.Author>}
    </Styled.QuoteContainer>
  )
}

export default Quote
