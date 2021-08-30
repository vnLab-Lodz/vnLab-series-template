import { MDXProvider } from "@mdx-js/react"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { mdxComponents } from "src/templates/section"
import * as Styled from "../style"

const query = graphql`
  {
    mdx(frontmatter: { meta: { eq: true } }, slug: { in: "about_project" }) {
      id
      body
    }
  }
`
const About: React.FC = () => {
  const { mdx } = useStaticQuery(query)

  return (
    <Styled.AboutWrapper>
      <Styled.AboutContent>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </Styled.AboutContent>
    </Styled.AboutWrapper>
  )
}

export default About
