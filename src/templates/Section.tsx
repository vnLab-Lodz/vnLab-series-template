import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SeoMeta from "~components/meta"
import Layout from "~components/organisms/layout"
import Abstract from "~components/molecules/abstract"
import Annotation from "~components/molecules/annotation"
import Quote from "~components/molecules/quote"
import atoms from "~components/atoms"
import Author from "~components/molecules/author"
import Edition from "~components/molecules/edition"
import ArticleMenu from "~components/organisms/article-menu"
import styled from "styled-components"

const components = {
  Link: MdxLink,
  Author: Author,
  Abstract: Abstract,
  Annotation: Annotation,
  Edition: Edition,
  Quote: Quote,
  h1: atoms.h1,
  h2: atoms.h2,
  h3: atoms.h3,
  p: atoms.p,
  strong: atoms.strong,
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

const StyledLayout = styled(Layout)`
  background: ${({ theme: { palette } }) => palette.light};
`

const Section: React.FC<PageProps<Data>> = ({ data: { mdx } }) => (
  <>
    <ArticleMenu />
    <StyledLayout>
      <MDXProvider components={components}>
        <SeoMeta title={mdx.frontmatter.title} />
        <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </StyledLayout>
  </>
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
