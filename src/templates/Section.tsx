import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "~components/layout"
import SeoMeta from "~components/meta"

const components = {
  Link: MdxLink,
}

interface Data {
  mdx: {
    id: string
    body: string & React.ReactNode
    frontmatter: {
      title: string
    }
  }
}

const Section: React.FC<PageProps<Data>> = ({ data: { mdx } }) => (
  <Layout>
    <MDXProvider components={components}>
      <SeoMeta title={mdx.frontmatter.title} />
      <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
    </MDXProvider>
  </Layout>
)

export const query = graphql`
  query ($locale: String!, $slugs: [String]) {
    mdx(fields: { locale: { eq: $locale } }, slug: { in: $slugs }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`

export default Section
