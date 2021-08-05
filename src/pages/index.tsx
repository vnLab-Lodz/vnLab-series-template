import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/PageLayout"
import Seo from "../components/Seo"
import { getLocaleName, getLocales, isUndefined } from "../util"
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

const StyledH1 = styled.h1`
  font-family: "HK-Grotesk";
  font-size: ${({ theme }) => theme.typography.desktop.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.palette.black};
`
const StyledH2 = styled.h2`
  font-family: "HK-Grotesk";
  font-size: ${({ theme }) => theme.typography.desktop.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.palette.black};
`

const StyledParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-size: ${({ theme }) => theme.typography.desktop.md};
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.xxs} 0px;
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
      <Seo title={t("home:title")} />
      <StyledH1>{t("home:congratulations")}</StyledH1>
      <StyledParagraph>{t("home:successfull-creation")}</StyledParagraph>
      <StyledParagraph>{t("home:create-sth-great")}</StyledParagraph>
      <StaticImage
        src="../images/gatsby-love.png"
        width={450}
        quality={100}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginLeft: -20 }}
      />
      <StyledParagraph>
        <StyledLink to="/page-two/" language={locale}>
          {t("common:go-to", { number: 2 })}
        </StyledLink>
      </StyledParagraph>
      {getLocales()
        .filter(l => l !== locale)
        .map(l => (
          <StyledParagraph key={l}>
            <StyledLink to="/" language={l}>
              {t("home:change-lang", { lang: getLocaleName(l) })}
            </StyledLink>
          </StyledParagraph>
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
