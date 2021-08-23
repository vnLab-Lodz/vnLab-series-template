import { graphql, useStaticQuery } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { useMemo } from "react"
import { isUndefined } from "~util"

interface MdxNode {
  id: string
  slug: string
  fields: {
    locale: string
  }
  frontmatter: {
    title: string
    summary: string
    index: number
    author: string
  }
}

interface SitePageNode {
  path: string
  context: {
    locale: string
    slugs: string[]
  }
}

interface Data {
  allMdx: {
    nodes: MdxNode[]
  }
  allSitePage: {
    nodes: SitePageNode[]
  }
}

export interface PublicationPage {
  id: string
  path: string
  title: string
  summary?: string
  index?: number
  author?: string
}

const defaultSort = (a: PublicationPage, b: PublicationPage) =>
  isUndefined(a.index) || isUndefined(b.index) ? 0 : a.index - b.index

const query = graphql`
  {
    allMdx {
      nodes {
        slug
        fields {
          locale
        }
        frontmatter {
          title
          summary
          index
          author
        }
        id
      }
    }
    allSitePage(filter: { context: { publication: { eq: true } } }) {
      nodes {
        context {
          locale
          slugs
        }
        path
      }
    }
  }
`

export default function usePublication(orderCallback = defaultSort) {
  const data = useStaticQuery<Data>(query)
  const { locale } = useLocalization()

  const mdxNodes = data.allMdx.nodes.filter(n => n.fields.locale === locale)
  const pageNodes = data.allSitePage.nodes.filter(
    n => n.context.locale === locale
  )

  const getPageMdx = ({ context: { slugs, locale } }: SitePageNode) =>
    mdxNodes.find(n => slugs.includes(n.slug) && locale === n.fields.locale)

  const pages = useMemo(
    () =>
      pageNodes
        .reduce((prev, page) => {
          const mdx = getPageMdx(page)

          return isUndefined(mdx)
            ? prev
            : [...prev, { id: mdx.id, path: page.path, ...mdx.frontmatter }]
        }, [] as PublicationPage[])
        .sort(orderCallback),
    [data]
  )

  return pages
}
