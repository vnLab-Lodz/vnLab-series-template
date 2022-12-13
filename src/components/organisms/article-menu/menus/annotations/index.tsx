import { graphql, useStaticQuery } from "gatsby"
import React, { createElement } from "react"
import ReactMarkdown from "react-markdown"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"
import { useMdxContext } from "src/context/mdx-provider"
import { components as mdxComponents } from "~components/mdx"
import * as Styled from "./style"

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
  footnotes?: Footnote[]
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

export const useFootnotes = () => {
  const data = useStaticQuery<Data>(query)
  const { id } = useMdxContext()
  const group = data.allFootnotes.group.find(node => node.mdxId === id)
  if (!group) return undefined
  return group.footnotes
}

type Footnote = {
  id: string
  link: string
  index: string
  content: string
}

type Data = {
  allFootnotes: {
    group: Array<{
      mdxId: string
      footnotes: Footnote[]
    }>
  }
}

const query = graphql`
  {
    allFootnotes {
      group(field: parent___id) {
        footnotes: nodes {
          id
          link
          index
          content
        }
        mdxId: fieldValue
      }
    }
  }
`
