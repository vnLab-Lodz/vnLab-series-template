import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SeoMeta from "~components/meta"
import atoms from "~components/atoms"
import { getLocaleName, getLocales, isUndefined } from "~util"
import { useTranslation } from "react-i18next"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import styled from "styled-components"
import Abstract from "~components/molecules/abstract"
import Quote from "~components/molecules/quote"
import Annotation from "~components/molecules/annotation"
import { GridContainer, GridConstraint } from "~styles/grid"

interface MdxNode {
  id: string
  slug: string
  fields: {
    locale: string
  }
  frontmatter: {
    title: string
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

interface PageLink {
  id: string
  path: string
  title: string
}

const StyledLink = styled(LocalizedLink)`
  color: ${({ theme }) => theme.palette.accentDark};
`

const IndexPage: React.FC<PageProps<Data>> = ({
  data: { allMdx, allSitePage },
}) => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "home"])

  const getPageMdx = ({ context: { slugs, locale } }: SitePageNode) =>
    allMdx.nodes.find(
      node => slugs?.includes(node.slug) && locale === node.fields.locale
    )

  const pageLinks = allSitePage.nodes.reduce((prev, page, index) => {
    const mdx = getPageMdx(page)
    const { path } = page

    return isUndefined(mdx)
      ? prev
      : [
          ...prev,
          { id: `${index}__${mdx.id}`, path, title: mdx.frontmatter.title },
        ]
  }, [] as PageLink[])

  return (
    <GridContainer>
      <SeoMeta title={t("home:title")} />
      <GridConstraint>
        {getLocales()
          .filter(l => l !== locale)
          .map(l => (
            <atoms.p key={l} style={{ margin: "1rem 0px" }}>
              <LocalizedLink to="/" language={l}>
                <atoms.button style={{ width: "100%" }}>
                  {t("home:change-lang", { lang: getLocaleName(l) })}
                </atoms.button>
              </LocalizedLink>
            </atoms.p>
          ))}
        <atoms.h2>{t("home:chapters")}</atoms.h2>
        <ul>
          {pageLinks.map(link => (
            <li key={link.id}>
              <Link to={link.path} style={{ color: "#00b140" }}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </GridConstraint>
    </GridContainer>
  )
}

export const query = graphql`
  query ($locale: String!) {
    allSitePage(filter: { context: { locale: { eq: $locale } } }) {
      nodes {
        path
        context {
          locale
          slugs
        }
      }
    }
    allMdx {
      nodes {
        id
        slug
        fields {
          locale
        }
        frontmatter {
          title
        }
      }
    }
  }
`

export default IndexPage
