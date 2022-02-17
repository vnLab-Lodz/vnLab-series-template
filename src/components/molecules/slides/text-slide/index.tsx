import React, { useRef } from "react"
import { useElementScroll } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { slidesMdxComponents } from "src/templates/slides"
import Slide from "../slide"
import * as Styled from "./style"
import { useSwipeable } from "react-swipeable"

interface Props {
  background?: string
}

const TextSlide: React.FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useElementScroll(containerRef)

  const isTextOverflowing = () => {
    if (!containerRef.current || !textRef.current) return false

    return textRef.current.offsetHeight > containerRef.current.offsetHeight
  }

  const handlers = useSwipeable({
    trackTouch: true,
    onSwiped: eventData => {
      if (isTextOverflowing()) {
        const scroll = scrollYProgress.get()
        const { dir } = eventData

        if ((scroll < 0.99 && dir === "Up") || (scroll > 0 && dir === "Down")) {
          return
        }
      }

      const event = new CustomEvent("deck_swipe", { detail: eventData })
      window.dispatchEvent(event)
    },
  })

  return (
    <Slide swipeHandlers={handlers}>
      <Styled.Container ref={containerRef}>
        <Styled.Text ref={textRef}>
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
