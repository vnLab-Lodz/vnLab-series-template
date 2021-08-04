import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/PageLayout"
import Seo from "../components/Seo"
import { getLocaleName, getLocales, isUndefined } from "../util"
import { useTranslation } from "react-i18next"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

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
  id: string
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

const IndexPage: React.FC<PageProps<Data>> = ({
  data: { allMdx, allSitePage },
}) => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "home"])

  const getPageMdx = ({ context: { slugs, locale } }: SitePageNode) =>
    allMdx.nodes.find(
      node => slugs?.includes(node.slug) && locale === node.fields.locale
    )

  const pagelinks = allSitePage.nodes.reduce((prev, page) => {
    const mdx = getPageMdx(page)
    const { id, path } = page

    return isUndefined(mdx)
      ? prev
      : [
          ...prev,
          { id: `${id}__${mdx.id}`, path, title: mdx.frontmatter.title },
        ]
  }, [] as PageLink[])

  return (
    <Layout>
      <Seo title={t("home:title")} />
      <h1>{t("home:congratulations")}</h1>
      <p>{t("home:successfull-creation")}</p>
      <p>{t("home:create-sth-great")}</p>
      <StaticImage
        src="../images/gatsby-love.png"
        width={450}
        quality={100}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem`, marginLeft: -20 }}
      />
      <p>
        <LocalizedLink
          to="/page-two/"
          language={locale}
          style={{ color: "#00b140" }}
        >
          {t("common:go-to", { number: 2 })}
        </LocalizedLink>
      </p>
      {getLocales()
        .filter(l => l !== locale)
        .map(l => (
          <p>
            <LocalizedLink to="/" language={l} style={{ color: "#00b140" }}>
              {t("home:change-lang", { lang: getLocaleName(l) })}
            </LocalizedLink>
          </p>
        ))}
      <h2>{t("home:chapters")}</h2>
      <ul>
        {pagelinks.map(link => (
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
