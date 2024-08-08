import { graphql, PageProps } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useMemo, useState } from "react"
import { PublicationPage } from "src/hooks/usePublication"
import { ThemeProvider } from "styled-components"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import { lightTheme } from "~styles/theme"
import { delocalizeSlug, isUndefined } from "~util"
import * as Styled from "../styles/page-styles/search"
import SearchInput from "~components/molecules/search-input"
import SearchTabs from "~components/molecules/search-tabs"
import { useTranslation } from "react-i18next"
import SearchResults from "~components/molecules/search-results"
import visit from "unist-util-visit"
import { toString } from "~util/toString"
import { create, insert, search } from "@lyrasearch/lyra"
import ServiceWorkerDialog from "~components/sw-dialog"
import { Footnote } from "src/context/footnotes-context"

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
      mdxAST: any
      rawBody: string
      fields: {
        locale: string
      }
      frontmatter: {
        title: string
        author: string
        summary: string
        index: number
        slideshow: boolean
      }
    }>
  }
  allSitePage: {
    nodes: SitePageNode[]
  }
  allFootnotes: {
    nodes: (Footnote & {
      mdx: { id: string; slug: string; fields: { locale: string } }
    })[]
  }
}

export interface SearchNode extends PublicationPage {
  mdxAST: any
}

export enum TABS {
  TITLES,
  EVERYWHERE,
  FOOTNOTES,
}

const Search: React.FC<PageProps<QueryData>> = ({ location, data }) => {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState(TABS.EVERYWHERE)

  const { locale } = useLocalization()
  const { t } = useTranslation("search")

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
                mdxAST: mdx.mdxAST,
                slideshow: mdx.frontmatter.slideshow,
              },
            ]
      }, []),
    [data]
  )

  const footnotes = useMemo(
    () =>
      data.allFootnotes.nodes.filter(node => node.mdx.fields.locale === locale),
    [data.allFootnotes]
  )

  const db = useMemo(() => {
    const database = create({
      schema: {
        uid: "string",
        link: "string",
        text: "string",
        isTitle: "boolean",
        pageId: "string",
        isFootnote: "boolean",
        footnoteIndex: "string",
      },
    })

    for (const page of pages) {
      visit(page.mdxAST, ["paragraph"], mdxNode => {
        const text = toString(mdxNode, { includeImageAlt: false })
        if (!text) return

        const uid = `paragraph__${mdxNode.position?.start.line}`
        const link = `${page.path}#${uid}`
        const isTitle = false
        const pageId = page.id
        insert(database, {
          uid,
          link,
          text,
          isTitle,
          pageId,
          isFootnote: false,
          footnoteIndex: "",
        })
      })

      const text = page.title
      const uid = page.id
      const link = `/${page.path}`
      const isTitle = true
      const pageId = page.id
      insert(database, {
        uid,
        link,
        text,
        isTitle,
        pageId,
        isFootnote: false,
        footnoteIndex: "",
      })
    }

    for (const footnote of footnotes) {
      const slug = delocalizeSlug(footnote.mdx.slug)
      const path = slug.replace("index", "")
      const link = `/${path}${footnote.link}`

      insert(database, {
        uid: footnote.id,
        link: link,
        text: footnote.content,
        isTitle: false,
        pageId: footnote.mdx.id,
        isFootnote: true,
        footnoteIndex: footnote.index.toString(),
      })
    }

    return database
  }, [pages, footnotes])

  const results = useMemo(() => {
    const searchResults = search(db, {
      term: query,
      properties: ["text"],
      limit: 1000,
    })

    const resultsForMapping =
      tab === TABS.TITLES
        ? searchResults.hits.filter(r => r.document.isTitle)
        : tab === TABS.FOOTNOTES
        ? searchResults.hits.filter(r => r.document.isFootnote)
        : searchResults.hits

    return resultsForMapping
      .map(
        r =>
          [
            r,
            {
              ...pages.find(p => p.id === r.document.pageId)!,
              path: r.document.link,
            },
          ] as const
      )
      .sort(([_a, a], [_b, b]) => ((a.index ?? 0) < (b.index ?? 0) ? -1 : 1))
  }, [db, query, tab, pages])

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <ThemeProvider theme={lightTheme}>
        <Styled.Wrapper>
          <Styled.SearchLayout>
            <SearchInput onSubmit={setQuery} />
            <Styled.FoundItems>
              {t("found_articles")} <strong>{results.length}</strong>
            </Styled.FoundItems>
            <SearchTabs tab={tab} setTab={setTab} />
            <SearchResults query={query} results={results} />
          </Styled.SearchLayout>
        </Styled.Wrapper>
        <ServiceWorkerDialog />
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
        mdxAST
        fields {
          locale
        }
        frontmatter {
          title
          author
          summary
          index
          slideshow
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
    allFootnotes {
      nodes {
        mdx {
          id
          slug
          fields {
            locale
          }
        }
        id
        link
        index
        content
      }
    }
  }
`

export default Search
