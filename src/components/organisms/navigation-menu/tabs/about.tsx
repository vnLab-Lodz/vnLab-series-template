import { MDXProvider } from "@mdx-js/react"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"
import { mdxComponents } from "src/templates/chapter"
import * as Styled from "../style"

interface Data {
  allMdx: {
    nodes: Array<{
      frontmatter: {
        locale: string
      }
      body: any
    }>
  }
}

const query = graphql`
  {
    allMdx(filter: { frontmatter: { meta: { eq: true } } }) {
      nodes {
        frontmatter {
          locale
        }
        body
      }
    }
  }
`

const About: React.FC = () => {
  const { locale } = useLocalization()
  const { allMdx } = useStaticQuery<Data>(query)

  const getLocalizedMdx = () =>
    allMdx.nodes.find(node => node.frontmatter.locale === locale)

  const mdx = getLocalizedMdx()

  return (
    <Styled.AboutWrapper>
      <Styled.AboutContent>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{mdx?.body}</MDXRenderer>
        </MDXProvider>
      </Styled.AboutContent>
    </Styled.AboutWrapper>
  )
}

export default About
