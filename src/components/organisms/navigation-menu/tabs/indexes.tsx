import React, { useState, useMemo, useCallback } from "react"
import { useLocalization } from "gatsby-theme-i18n"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { delocalizeSlug } from "~util/slug"
import * as Styled from "../style"
import atoms from "~components/atoms"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { flushSync } from "react-dom"

const Indexes: React.FC = () => {
  const tags = useTags()
  const [tabState, setTabState] = useState<string>(tags[0]?.category ?? "")
  const { toggleNav } = useNavMenuContext()

  const activeTag = useMemo(
    () => tags.find(t => t.category === tabState),
    [tabState]
  )

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
            <Styled.TabButton onClick={() => setTabState(tag.category)}>
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
              <Styled.IndexLetter>{key.toUpperCase()}</Styled.IndexLetter>
              {activeTag?.keywords[key].map(keyword => {
                return (
                  <Styled.IndexText key={keyword.keyword} as="div">
                    <atoms.p>{keyword.keyword}</atoms.p>
                    {keyword.anchors.map(anchor => (
                      <React.Fragment key={anchor.id}>
                        <Styled.BiogramLink
                          role="link"
                          data-href={anchor.link}
                          title={`${anchor.mdx.frontmatter.index} - ${anchor.mdx.frontmatter.title}`}
                          onClick={() => {
                            flushSync(() => {
                              toggleNav()
                            })
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
                        >
                          {anchor.mdx.frontmatter.index} -{" "}
                          {anchor.mdx.frontmatter.title}
                        </Styled.BiogramLink>
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

          acc.push({ ...anchor, link: path })
          return acc
        }, [] as LinkedAnchor[])
        if (anchors.length === 0) return acc

        const key = keyword.keyword[0]
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

  const tags = useMemo(
    () => data.allTags.nodes.reduce(filterByLocale, [] as LinkedTag[]),
    [data, filterByLocale]
  )

  return tags
}

interface LinkedTag {
  id: string
  category: string
  keywords: Record<string, LinkedKeyword[]>
}
interface LinkedKeyword extends Keyword {
  anchors: LinkedAnchor[]
}
interface LinkedAnchor extends Anchor {
  link: string
}

type Data = { allTags: { nodes: Tag[] } }
type Tag = { id: string; category: string; keywords: Keyword[] }
type Keyword = { keyword: string; anchors: Anchor[] }
type Anchor = { id: string; mdx: Mdx }
type Mdx = { id: string; slug: string; frontmatter: Frontmatter }
type Frontmatter = { index: string; title: string }

const query = graphql`
  {
    allTags {
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
`
