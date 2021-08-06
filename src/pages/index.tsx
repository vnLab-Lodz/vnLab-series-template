import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "~components/layout"
import SeoMeta from "~components/meta"
import atoms from "~components/atoms"
import { getLocaleName, getLocales, isUndefined } from "~util"
import { useTranslation } from "react-i18next"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import styled from "styled-components"

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

const StyledH1 = styled(atoms.h1)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
const StyledH2 = styled(atoms.h2)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
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
    <Layout>
      <SeoMeta title={t("home:title")} />
      <StyledH1>{t("home:congratulations")}</StyledH1>
      <atoms.p>{t("home:successfull-creation")}</atoms.p>
      <atoms.p>{t("home:create-sth-great")}</atoms.p>
      <StaticImage
        src="../images/gatsby-love.png"
        width={450}
        quality={100}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginLeft: -20 }}
      />
      <atoms.p>
        <StyledLink to="/page-two/" language={locale}>
          {t("common:go-to", { number: 2 })}
        </StyledLink>
      </atoms.p>
      {getLocales()
        .filter(l => l !== locale)
        .map(l => (
          <atoms.p key={l}>
            <StyledLink to="/" language={l}>
              {t("home:change-lang", { lang: getLocaleName(l) })}
            </StyledLink>
          </atoms.p>
        ))}
      <StyledH2>{t("home:chapters")}</StyledH2>
      <ul>
        {pageLinks.map(link => (
          <li key={link.id}>
            <Link to={link.path} style={{ color: "#00b140" }}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
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
