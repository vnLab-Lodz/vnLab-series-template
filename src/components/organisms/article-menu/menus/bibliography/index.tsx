import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { stripSlug } from "~util/slug"
import { MDXProvider } from "@mdx-js/react"
import { mdxComponents } from "src/templates/chapter"
import { MDXRenderer } from "gatsby-plugin-mdx"

interface Props {
  currentPath: string
}

interface Query {
  allMdx: {
    nodes: Array<{
      frontmatter: {
        locale: string
      }
      slug: string
      body: any
      rawBody: any
    }>
  }
}

export const query = graphql`
  {
    allMdx(
      filter: {frontmatter: {meta: {eq: true}}, slug: {regex: "/[\\w+\\/]+bibliography[.\\w+]*/"}}
    ) {
      nodes {
        frontmatter {
          locale
        }
        slug
        body
      }
    }
  }`

const Bibliography: React.FC<Props> = ({ currentPath }) => {
  const { allMdx } = useStaticQuery<Query>(query)
  const { locale } = useLocalization()
  const bibliography = allMdx.nodes.find(
    n =>
      n.slug.includes(stripSlug(currentPath)) && n.frontmatter.locale === locale
  )

  return (
    <div>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{bibliography?.body}</MDXRenderer>
      </MDXProvider>
    </div>
  )
}

export default Bibliography
