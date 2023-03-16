import React, { useState, useMemo, useCallback } from "react"
import { useLocalization } from "gatsby-theme-i18n"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { delocalizeSlug } from "~util/slug"
import * as Styled from "../style"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { flushSync } from "react-dom"
import * as _ from "lodash"

const Indexes: React.FC = () => {
  const tags = useTags()
  const [tabState, setTabState] = useState<string>(tags[0]?.category ?? "")
  const { toggleNav } = useNavMenuContext()

  const activeTag = useMemo(() => {
    const tag = tags.find(t => t.category === tabState)
    if (!tag) return undefined
    return tag
  }, [tabState])

  const keys = useMemo(
    () =>
      Object.keys(activeTag?.keywords ?? {}).sort((a, b) => a.localeCompare(b)),
    [activeTag]
  )

  return (
    <Styled.IndexesWrapper>
      <Styled.IndexesTabs>
        <Styled.TabItems>
          {tags.map(tag => (
            <Styled.TabButton
              key={tag.category}
              onClick={() => setTabState(tag.category)}
            >
              <Styled.TabButtonText active={tabState === tag.category}>
                {tag.category}
              </Styled.TabButtonText>
            </Styled.TabButton>
          ))}
        </Styled.TabItems>
      </Styled.IndexesTabs>
      <Styled.ActiveTabWrapper>
        {keys.map(key => {
          return (
            <React.Fragment key={key}>
              <Styled.IndexLetter>
                <span>{key.toUpperCase()}</span>
              </Styled.IndexLetter>
              {activeTag?.keywords[key].map(keyword => {
                return (
                  <Styled.IndexText key={keyword.keyword} as="div">
                    <Styled.Keyword>{keyword.keyword}</Styled.Keyword>
                    {keyword.anchors.map(([mdx, anchors], i) => (
                      <React.Fragment
                        key={`${keyword.keyword}__${mdx.id}--${i}`}
                      >
                        <Styled.ChapterTitle
                          tabIndex={0}
                          role="link"
                          data-href={mdx.link}
                          onClick={() => navigate(`/${mdx.link.split("/")[0]}`)}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              navigate(`/${mdx.link.split("/")[0]}`)
                            }
                          }}
                        >
                          {mdx.title}
                        </Styled.ChapterTitle>
                        <Styled.Mentions>
                          WYSTĄPIENIA: {anchors.length}
                        </Styled.Mentions>
                        <Styled.Anchors>
                          {anchors.map((anchor, j) => (
                            <React.Fragment key={anchor.id}>
                              <Styled.BiogramLink
                                tabIndex={0}
                                role="link"
                                data-href={anchor.link}
                                title={`${j} - ${anchor.mdx.frontmatter.title}`}
                                onClick={() => {
                                  flushSync(toggleNav)
                                  setTimeout(() => {
                                    const element = document.querySelector(
                                      `#${anchor.id}`
                                    )
                                    if (!element) {
                                      navigate(anchor.link)
                                      return
                                    }

                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    })
                                  }, 0)
                                }}
                                onKeyDown={e => {
                                  if (e.key === "Enter") {
                                    flushSync(toggleNav)
                                    setTimeout(() => {
                                      const element = document.querySelector(
                                        `#${anchor.id}`
                                      )
                                      if (!element) {
                                        navigate(anchor.link)
                                        return
                                      }

                                      element.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                      })
                                    }, 0)
                                  }
                                }}
                              >
                                {j + 1}
                              </Styled.BiogramLink>
                            </React.Fragment>
                          ))}
                        </Styled.Anchors>
                      </React.Fragment>
                    ))}
                  </Styled.IndexText>
                )
              })}
            </React.Fragment>
          )
        })}
      </Styled.ActiveTabWrapper>
    </Styled.IndexesWrapper>
  )
}

export default Indexes

export const useTags = () => {
  const data = useStaticQuery<Data>(query)
  const { locale, localizedPath, defaultLang, prefixDefault } =
    useLocalization()

  const filterByLocale = useCallback(
    (acc: LinkedTag[], tag: Tag) => {
      if (tag.keywords.length === 0) return acc

      const keywords = tag.keywords.reduce((acc, keyword) => {
        if (keyword.anchors.length === 0) return acc

        const anchors = keyword.anchors.reduce((acc, anchor) => {
          if (!anchor.mdx.slug.includes(`.${locale}`)) return acc

          const path = localizedPath({
            path: `/${delocalizeSlug(anchor.mdx.slug).replace("index", "")}#${
              anchor.id
            }`,
            defaultLang,
            locale,
            prefixDefault,
          })

          const group = acc.find(
            a => a[0].title === anchor.mdx.frontmatter.title
          )
          if (group) {
            group[1].push({ ...anchor, link: path })
          } else {
            acc.push([
              {
                id: anchor.mdx.id,
                title: anchor.mdx.frontmatter.title,
                link: anchor.mdx.slug,
              },
              [{ ...anchor, link: path }],
            ])
          }

          return acc
        }, [] as LinkedKeyword["anchors"])
        if (anchors.length === 0) return acc

        const key = keyword.keyword[0].toUpperCase()
        if (!key) return acc

        const array = acc[key] ?? []
        array.push({ ...keyword, anchors })
        acc[key] = array.sort((a, b) => a.keyword.localeCompare(b.keyword))

        return acc
      }, {} as Record<string, LinkedKeyword[]>)
      if (Object.entries(keywords).length === 0) return acc

      acc.push({ ...tag, keywords })
      return acc
    },
    [locale]
  )

  const tags = useMemo(() => {
    const nodes = data.allTags.group.map(group =>
      group.nodes.reduce((acc, curr) => {
        if (_.isEmpty(acc)) return curr

        for (const keyword of curr.keywords) {
          const i = acc.keywords.findIndex(k => k.keyword === keyword.keyword)

          if (i < 0) {
            acc.keywords.push(keyword)
            continue
          }

          acc.keywords[i].anchors = mergeArr(
            acc.keywords[i].anchors,
            keyword.anchors
          )
        }

        return acc
      }, {} as Tag)
    ) as Tag[]

    return nodes.reduce(filterByLocale, [] as LinkedTag[])
  }, [data, filterByLocale])

  return tags
}

const mergeArr = (target: any[], array: any[]) => {
  const joined = [...target, ...array]
  return [...new Map(joined.map(item => [item.id, item])).values()]
}

interface LinkedTag {
  id: string
  category: string
  keywords: Record<string, LinkedKeyword[]>
}
interface LinkedKeyword {
  keyword: string
  anchors: [
    {
      id: string
      title: string
      link: string
    },
    LinkedAnchor[]
  ][]
}
interface LinkedAnchor extends Anchor {
  link: string
}

type Data = {
  allTags: {
    group: Array<{
      fieldValue: string
      field: string
      nodes: Tag[]
    }>
  }
}
type Tag = { id: string; category: string; keywords: Keyword[] }
type Keyword = { keyword: string; anchors: Anchor[] }
type Anchor = { id: string; mdx: Mdx }
type Mdx = { id: string; slug: string; frontmatter: Frontmatter }
type Frontmatter = { index: string; title: string }

const query = graphql`
  {
    allTags {
      group(field: category) {
        field
        fieldValue
        nodes {
          category
          id
          keywords {
            keyword
            anchors {
              id
              mdx {
                id
                slug
                frontmatter {
                  title
                  index
                }
              }
            }
          }
        }
      }
    }
  }
`
