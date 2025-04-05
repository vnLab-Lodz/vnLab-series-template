import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import * as Styled from "./style"

import XSVG from "src/images/icons/x.svg"
import ISVG from "src/images/icons/i.svg"

export type CaptionProps = {
  caption?: string
  extendedCaption?: string
}

interface Props extends CaptionProps {
  children?:
    | React.ReactNode
    | ((props: {
        button: React.ReactNode
        caption: React.ReactNode
      }) => React.ReactNode)
}

const hComponents = { ...mdxComponents, p: Styled.CaptionHeader } as any
const pComponents = { ...mdxComponents, p: Styled.CaptionParagraph } as any

const CaptionSlide: React.FC<Props> = ({
  extendedCaption,
  children,
  caption,
}) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(prev => !prev)

  const renderMarkdown = (components: any, markdown?: string) => {
    if (!markdown) return null
    return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
  }

  const button = !!caption ? (
    <Styled.CaptionButton onClick={toggle}>
      <span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="sizeable-icon"
        >
          <path
            d="M9.21995 2.78003L6.69995 5.30003"
            stroke="#111111"
            strokeMiterlimit="10"
          />
          <path
            d="M7.17993 1.64L11.4999 0.5L10.3599 4.82L7.17993 1.64Z"
            fill="#111111"
            strokeWidth={0}
          />
          <path
            d="M2.78003 9.21995L5.30003 6.69995"
            stroke="#111111"
            strokeMiterlimit="10"
          />
          <path
            d="M4.82 10.3599L0.5 11.4999L1.64 7.17993L4.82 10.3599Z"
            fill="#111111"
            strokeWidth={0}
          />
        </svg>
      </span>
    </Styled.CaptionButton>
  ) : null

  const captionComponent =
    open && !!caption ? (
      <Styled.Caption>
        <Styled.CaptionHeader as="div">
          {renderMarkdown(hComponents, caption)}
        </Styled.CaptionHeader>
        <Styled.CloseBtn onClick={toggle}>
          <img src={XSVG} alt="Close" />
        </Styled.CloseBtn>
        {!!extendedCaption ? (
          <Styled.CaptionParagraph as="div" $padded={!!children}>
            {renderMarkdown(pComponents, extendedCaption)}
          </Styled.CaptionParagraph>
        ) : null}
      </Styled.Caption>
    ) : null

  return (
    <Styled.CaptionSlideContainer $noConstraint>
      {typeof children === "function" ? (
        children({ button, caption: captionComponent })
      ) : (
        <>
          {children}
          {button}
        </>
      )}
      <AnimatePresence>{captionComponent}</AnimatePresence>
    </Styled.CaptionSlideContainer>
  )
}

export default CaptionSlide
