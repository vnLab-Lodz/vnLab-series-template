import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  PropsWithChildren,
  useCallback,
  createElement,
} from "react"
import ReactDOM from "react-dom"
import * as Styled from "./style"
import { AnnotationContext } from "./annotation-context"
import ReactMarkdown from "react-markdown"
import { MDXProvider } from "@mdx-js/react"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "styled-components"
import lightTheme from "~styles/theme"
import { v4 } from "uuid"
import { useRefEffect } from "src/hooks/useRefEffect"
import { useStaticQuery, graphql } from "gatsby"

import XSVG from "../../../images/icons/x.svg"
import { useMdxContext } from "src/context/mdx-provider"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"
import { components as mdxComponents } from "~components/mdx"

interface Props {
  id?: string
  target: string
}

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

const Annotation: React.FC<PropsWithChildren<Props>> = ({
  id,
  target,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLSpanElement | null>(null)
  const offsetRef = useRef<number>(0)
  const { annotations, addAnnotation } = useContext(AnnotationContext)
  const annotation = annotations.find(a => a.target === target)

  const calculatePosition = () => {
    if (!ref || !ref.current) return

    const doc = document.documentElement
    const elementRect = ref.current.getBoundingClientRect()
    const parentRect = ref.current.parentElement?.getBoundingClientRect()
    const offset = parentRect?.height ?? elementRect.height

    offsetRef.current = offset
    setPosition(elementRect.top + doc.scrollTop + offset)
  }

  useEffect(() => calculatePosition(), [ref])

  useEffect(() => {
    if (
      children &&
      ref &&
      typeof position === "number" &&
      !annotations.find(a => a.id)
    ) {
      const pos = !!position ? position - offsetRef.current : 0

      addAnnotation(id ?? v4(), target, children, pos, () =>
        ref.current?.scrollIntoView({ behavior: "smooth" })
      )
    }
  }, [ref, position])

  const toggleAnnotation = () => setOpen(prev => !prev)

  const handleIndexClick = () => {
    calculatePosition()
    toggleAnnotation()
  }

  return (
    <Styled.FootnoteTarget>
      <ReactMarkdown
        components={{ ...mdxComponents, p: Styled.InheritParagraph } as any}
      >
        {target}
      </ReactMarkdown>
      <Styled.FootnoteIndex
        ref={ref}
        onClick={handleIndexClick}
        id={id ?? v4()}
      >
        {annotation?.index}
      </Styled.FootnoteIndex>
      <AnimatePresence>
        {open && (
          <FootnotePortal
            index={annotation?.index ?? 0}
            position={position}
            toggle={toggleAnnotation}
          >
            {typeof children === "string" ? (
              <ReactMarkdown
                components={
                  { ...mdxComponents, p: Styled.InheritParagraph } as any
                }
              >
                {children}
              </ReactMarkdown>
            ) : (
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            )}
          </FootnotePortal>
        )}
      </AnimatePresence>
    </Styled.FootnoteTarget>
  )
}

export default Annotation

/// ---------------Footnote

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

  const [_, setRef] = useRefEffect<HTMLSpanElement>(node => {
    const listener = () => setPosition(node.offsetTop + node.offsetHeight)

    listener()
    const observer = new ResizeObserver(listener)
    window.addEventListener("resize", listener)
    observer.observe(node)

    return () => {
      window.removeEventListener("resize", listener)
      observer.unobserve(node)
    }
  }, [])

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

const useFootnote = (index: string) => {
  const data = useStaticQuery<Data>(query)
  const { id } = useMdxContext()
  const group = data.allFootnotes.group.find(node => node.mdxId === id)
  if (!group) return undefined
  return group.footnotes.find(f => f.index === index)
}

type Data = {
  allFootnotes: {
    group: Array<{
      mdxId: string
      footnotes: Array<{ index: string; content: string }>
    }>
  }
}

const query = graphql`
  {
    allFootnotes {
      group(field: parent___id) {
        footnotes: nodes {
          content
          index
        }
        mdxId: fieldValue
      }
    }
  }
`
