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
    <GridContainer>
      <SeoMeta title={t("home:title")} />
      <GridConstraint>
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
        <Abstract>
          We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
          dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest
          absurdalna, pozbawiona sensu i uzasadnienia w świecie, w którym piękno
          i miłość to synonimy życia.
        </Abstract>
        <Quote author="Agnes Wardy">
          We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
          dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest
          absurdalna, pozbawiona sensu i uzasadnienia w świecie, w którym piękno
          i miłość to synonimy życia.
        </Quote>
        <atoms.p style={{ maxWidth: "800px" }}>
          We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
          dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest{" "}
          <Annotation target="absurdalna">
            Po raz pierwszy Varda użyła tego określenia w odniesieniu do swojego
            wczesnego filmu eksperymentalnego L’Opéra-Mouffe (1958) i posługuje
            się nim konsekwentnie do dziś, doskonaląc stopniowo ten autorski
            gatunek z pogranicza dokumentu intymnego, filmowego dziennika i
            awangardowego kolażu. Por. Dominique Bluher, La miroitière. À propos
            de quelques films et installations d’Agnès Varda, w: Agnès Varda: le
            cinéma et au-delà, red. A. Fiant, R. Hamery, É. Thouvenel, Presses
            Universitaires de Rennes, Rennes 2009, s. 177; Alison Smith, Agnès
            Varda, Manchester University Press, Manchester–New York 2005, s. 94.
          </Annotation>
          , pozbawiona sensu i uzasadnienia w świecie, w którym piękno i miłość
          to synonimy życia.
        </atoms.p>
        <atoms.p>
          <StyledLink to="/page-two/" language={locale}>
            {t("common:go-to", { number: 2 })}
          </StyledLink>
        </atoms.p>
        {getLocales()
          .filter(l => l !== locale)
          .map(l => (
            <atoms.p key={l} style={{ margin: "1rem 0px" }}>
              <LocalizedLink to="/" language={l}>
                <atoms.button>
                  {t("home:change-lang", { lang: getLocaleName(l) })}
                </atoms.button>
              </LocalizedLink>
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
