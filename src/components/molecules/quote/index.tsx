import React, { CSSProperties, PropsWithChildren } from "react"
import * as Styled from "./style"

interface Props {
  style?: CSSProperties
  author?: string
  className?: string
}

const Quote: React.FC<PropsWithChildren<Props>> = ({
  children,
  author,
  style,
  className,
}) => {
  return (
    <Styled.QuoteContainer style={style} className={className}>
      <Styled.QuoteText>{children}</Styled.QuoteText>
      {author && <Styled.Author type="primary">{author}</Styled.Author>}
    </Styled.QuoteContainer>
  )
}

export default Quote
