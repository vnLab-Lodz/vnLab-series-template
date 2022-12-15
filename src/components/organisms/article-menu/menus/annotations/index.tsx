import React, { createElement } from "react"
import ReactMarkdown from "react-markdown"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"
import { components as mdxComponents } from "~components/mdx"
import * as Styled from "./style"
import { Footnote as FootnoteType } from "src/context/footnotes-context"

type FootnoteProps = {
  index: string
  link: string
  content: string
  closeMenu: (callback?: () => void) => void
}

const Footnote: React.FC<FootnoteProps> = props => {
  const handleClick = () => {
    props.closeMenu(() => {
      const element: HTMLElement | null = document.querySelector(props.link)
      if (!element) return

      element.focus()
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      <Styled.FootnoteNumber>{props.index}</Styled.FootnoteNumber>
      <Styled.FootnoteParagraph
        as="div"
        role="link"
        data-href={props.link}
        onClick={handleClick}
      >
        <ReactMarkdown components={components}>{props.content}</ReactMarkdown>
      </Styled.FootnoteParagraph>
    </>
  )
}

type Props = {
  closeMenu: (callback?: () => void) => void
  footnotes?: FootnoteType[]
}

const Footnotes: React.FC<Props> = ({ closeMenu, footnotes = [] }) => (
  <Styled.FootnotesGrid>
    {footnotes.map(footnote => (
      <Footnote
        key={`inmenu-annotation_${footnote.id}`}
        index={footnote.index}
        link={footnote.link}
        content={footnote.content}
        closeMenu={closeMenu}
      />
    ))}
  </Styled.FootnotesGrid>
)

export default Footnotes

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
