import { graphql, useStaticQuery } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { stripSlug } from "~util"

export interface BibliographyType {
  frontmatter: {
    locale: string
  }
  slug: string
  body: any
  rawBody: any
}

interface Query {
  allMdx: {
    nodes: BibliographyType[]
  }
}

const query = graphql`
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

export default function useBibliography(currentPath: string) {
  const { locale: currentLocale } = useLocalization()
  const { allMdx } = useStaticQuery<Query>(query)
  const currentSlug = stripSlug(currentPath)

  const bibliography = allMdx.nodes.find(
    ({ frontmatter: { locale }, slug }) =>
      slug.includes(currentSlug) && locale === currentLocale
  )

  return bibliography
}
