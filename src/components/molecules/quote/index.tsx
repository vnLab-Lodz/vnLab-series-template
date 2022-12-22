import React, { CSSProperties, PropsWithChildren } from "react"
import { InnerGrid } from "~styles/grid"
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

export const BlockQuote: React.FC<PropsWithChildren<Props>> = ({
  children,
  author,
  style,
  className,
}) => {
  return (
    <Styled.BlockQuoteContainer style={style} className={className}>
      <Styled.BlockQuoteIcon role="img" aria-label="Quote symbol">
        „
      </Styled.BlockQuoteIcon>
      <Styled.BlockQuoteText>{children}</Styled.BlockQuoteText>
      {author && (
        <Styled.BlockQuoteAuthor type="primary">
          {author}
        </Styled.BlockQuoteAuthor>
      )}
    </Styled.BlockQuoteContainer>
  )
}

export default Quote
