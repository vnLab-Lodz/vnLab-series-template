import React, {
  useState,
  PropsWithChildren,
  useCallback,
  createElement,
} from "react"
import ReactDOM from "react-dom"
import * as Styled from "./style"
import ReactMarkdown from "react-markdown"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "styled-components"
import lightTheme from "~styles/theme"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"
import { components as mdxComponents } from "~components/mdx"
import { useRefEffect } from "src/hooks/useRefEffect"
import { useFootnote } from "src/context/footnotes-context"

import XSVG from "../../../images/icons/x.svg"

interface PortalProps {
  index: number | string
  position: number | undefined
  toggle: () => void
}

const FootnotePortal: React.FC<PropsWithChildren<PortalProps>> = ({
  index,
  children,
  position,
  toggle,
}) => {
  return ReactDOM.createPortal(
    <ThemeProvider theme={lightTheme}>
      <Styled.FootnoteContent
        as={motion.article}
        style={{ top: `${position}px` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={e => e.stopPropagation()}
      >
        <Styled.CloseBtn
          onClick={e => {
            e.stopPropagation()
            toggle()
          }}
        >
          <img src={XSVG} alt="Close" />
        </Styled.CloseBtn>
        <Styled.FootnoteNumber>{index}</Styled.FootnoteNumber>
        <Styled.FootnoteParagraph as="div">{children}</Styled.FootnoteParagraph>
      </Styled.FootnoteContent>
    </ThemeProvider>,
    document.body
  )
}

export const FootnoteIndex = Styled.FootnoteIndex

const wrapComponentsForReactMarkdown = (o: object) => {
  return Object.entries(o).reduce(
    (acc, [key, el]) => ({ ...acc, [key]: (p: any) => createElement(el, p) }),
    {}
  )
}

const components: ReactMarkdownOptions["components"] = {
  ...wrapComponentsForReactMarkdown(mdxComponents),
  p: props => <Styled.InheritParagraph {...props} />,
}

type FootnoteProps = PropsWithChildren<{ id: string; index: string }>

export const FootnoteTarget: React.FC<FootnoteProps> = props => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const footnote = useFootnote(props.index)

  const toggle = useCallback(() => setOpen(prev => !prev), [])

  const [_, setRef] = useRefEffect<HTMLSpanElement>(
    node => {
      const listener = () => setPosition(node.offsetTop + node.offsetHeight)

      listener()
      const observer = new ResizeObserver(listener)
      window.addEventListener("resize", listener)
      observer.observe(node)

      return () => {
        window.removeEventListener("resize", listener)
        observer.unobserve(node)
      }
    },
    [open]
  )

  return (
    <Styled.FootnoteTarget
      ref={setRef}
      id={props.id}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter") toggle()
      }}
    >
      {props.children}
      <AnimatePresence>
        {footnote && open ? (
          <FootnotePortal
            index={props.index}
            position={position}
            toggle={toggle}
          >
            <ReactMarkdown key={footnote.content} components={components}>
              {footnote.content}
            </ReactMarkdown>
          </FootnotePortal>
        ) : null}
      </AnimatePresence>
    </Styled.FootnoteTarget>
  )
}
