import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import * as Styled from "./style"

import XSVG from "src/images/icons/x.svg"

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
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <g id="i" transform="translate(-55.5 -93.9)">
            <g id="Group_152" data-name="Group 152">
              <path
                id="Path_60"
                data-name="Path 60"
                d="M62.8,98.1h1.4v1.2H62.8V98.1Zm.1,2.2h1.3v5.4H62.9v-5.4Z"
              />
            </g>
          </g>
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
