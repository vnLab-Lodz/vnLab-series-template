import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { DetailedHTMLProps, MetaHTMLAttributes } from "react"
import { SiteMetadata } from "../../types/config"
import { useTranslation } from "react-i18next"

type Meta = DetailedHTMLProps<
  MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>

interface Props {
  lang?: string
  title: string
  description?: string
  meta?: Meta[]
}

interface Query {
  site: {
    siteMetadata: Omit<SiteMetadata, "siteUrl">
  }
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

const Seo: React.FC<Props> = ({ description, meta, title, lang = "en" }) => {
  const { t } = useTranslation("common")
  const { site } = useStaticQuery<Query>(query)
  const defaultTitle = t("title", site.siteMetadata.title)
  const metaDescription = description ?? site.siteMetadata.description
  const titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : undefined

  const getMeta = (): Meta[] => {
    const metaPartial: Meta[] = [
      {
        name: `description`,
        content: metaDescription,
      },
      {
        property: `og:title`,
        content: title,
      },
      {
        property: `og:description`,
        content: metaDescription,
      },
      {
        property: `og:type`,
        content: `website`,
      },
      {
        name: `twitter:card`,
        content: `summary`,
      },
      {
        name: `twitter:creator`,
        content: site.siteMetadata.author || ``,
      },
      {
        name: `twitter:title`,
        content: title,
      },
      {
        name: `twitter:description`,
        content: metaDescription,
      },
    ]

    return metaPartial.concat(meta ?? [])
  }

  return (
    <Helmet
      title={title}
      meta={getMeta()}
      htmlAttributes={{ lang }}
      titleTemplate={titleTemplate}
    />
  )
}

export default Seo
