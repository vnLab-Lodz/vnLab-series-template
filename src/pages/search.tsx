import { graphql, PageProps } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useMemo, useState } from "react"
import { PublicationPage } from "src/hooks/usePublication"
import { ThemeProvider } from "styled-components"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import SearchClient, {
  EngineOptions,
} from "~components/organisms/search-client"
import { lightTheme } from "~styles/theme"
import { isUndefined } from "~util"
import * as Styled from "../styles/page-styles/search"

interface SitePageNode {
  path: string
  context: {
    locale: string
    slugs: string[]
  }
}

interface QueryData {
  allMdx: {
    nodes: Array<{
      id: string
      slug: string
      rawBody: string
      fields: {
        locale: string
      }
      frontmatter: {
        title: string
        author: string
        summary: string
        index: number
      }
    }>
  }
  allSitePage: {
    nodes: SitePageNode[]
  }
}

export interface SearchNode extends PublicationPage {
  rawBody: string
}

const options: EngineOptions = {
  indexStrategy: "Prefix match",
  searchSanitizer: "Lower Case",
  indexes: ["author", "title", "summary", "rawBody"],
}

const Search: React.FC<PageProps<QueryData>> = ({ location, data }) => {
  const { locale } = useLocalization()

  const mdxNodes = data.allMdx.nodes.filter(n => n.fields.locale === locale)
  const pageNodes = data.allSitePage.nodes.filter(
    n => n.context.locale === locale
  )

  const getPageMdx = ({ context: { slugs, locale } }: SitePageNode) =>
    mdxNodes.find(n => slugs?.includes(n.slug) && locale === n.fields.locale)

  const pages = useMemo(
    () =>
      pageNodes.reduce<SearchNode[]>((prev, page) => {
        const mdx = getPageMdx(page)

        return isUndefined(mdx)
          ? prev
          : [
              ...prev,
              {
                id: mdx.id,
                path: page.path,
                title: mdx.frontmatter.title,
                author: mdx.frontmatter.author,
                summary: mdx.frontmatter.summary,
                index: mdx.frontmatter.index,
                rawBody: mdx.rawBody,
              },
            ]
      }, []),
    [data]
  )

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <ThemeProvider theme={lightTheme}>
        <Styled.Wrapper>
          <Styled.SearchLayout>
            <SearchClient data={pages} engine={options} />
          </Styled.SearchLayout>
        </Styled.Wrapper>
      </ThemeProvider>
    </NavMenuProvider>
  )
}

export const query = graphql`
  {
    allMdx(filter: { frontmatter: { meta: { ne: true } } }) {
      nodes {
        id
        slug
        rawBody
        fields {
          locale
        }
        frontmatter {
          title
          author
          summary
          index
        }
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

export default Search
