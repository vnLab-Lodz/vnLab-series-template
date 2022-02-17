import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { mdxComponents } from "src/templates/chapter"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BibliographyType } from "src/hooks/useBibliography"
import * as Styled from "./style"

interface Props {
  bibliography: BibliographyType | undefined
}

const Bibliography: React.FC<Props> = ({ bibliography }) => (
  <div>
    <MDXProvider components={{ ...mdxComponents, p: Styled.InheritParagraph }}>
      {!!bibliography && <MDXRenderer>{bibliography.body}</MDXRenderer>}
    </MDXProvider>
  </div>
)

export default Bibliography
