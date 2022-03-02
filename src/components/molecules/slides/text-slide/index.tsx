import React, { useEffect, useRef } from "react"
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
  const moveConstrained = useRef(true)
  const swipeHandled = useRef(false)
  const { scrollYProgress } = useElementScroll(containerRef)

  const isTextOverflowing = () => {
    if (!containerRef.current || !textRef.current) return false

    return textRef.current.offsetHeight > containerRef.current.offsetHeight
  }

  const handlers = useSwipeable({
    trackTouch: true,
    onSwipeStart: eventData => {
      swipeHandled.current = false

      const scroll = scrollYProgress.get()
      const { dir } = eventData

      if ((scroll < 0.99 && dir === "Up") || (scroll > 0 && dir === "Down")) {
        moveConstrained.current = true
      }
    },
    onSwiped: eventData => {
      const { dir } = eventData

      if (dir === "Up" || dir === "Down") {
        if (isTextOverflowing() && moveConstrained.current) {
          const scroll = scrollYProgress.get()

          if (
            (scroll < 0.99 && dir === "Up") ||
            (scroll > 0 && dir === "Down")
          ) {
            swipeHandled.current = true
            return
          }

          moveConstrained.current = false
          swipeHandled.current = true
          return
        }
      }

      const event = new CustomEvent("deck_swipe", { detail: eventData })
      window.dispatchEvent(event)
      swipeHandled.current = true
    },
  })

  useEffect(
    () =>
      scrollYProgress.onChange(progress => {
        if ((progress > 0.99 || progress < 0.01) && swipeHandled.current) {
          moveConstrained.current = false
        }
      }),
    []
  )

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
