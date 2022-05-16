import React, { DetailedHTMLProps, MetaHTMLAttributes, useMemo } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
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

const SeoMeta: React.FC<Props> = ({
  description,
  meta,
  title,
  lang = "en",
}) => {
  const { t } = useTranslation("common")
  const { site } = useStaticQuery<Query>(query)
  const defaultTitle = t("title", site.siteMetadata.title)
  const titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : undefined

  const metaDescription = useMemo(
    () => description ?? site.siteMetadata.description,
    [description, site.siteMetadata.description]
  )

  const metaData: Meta[] = useMemo(() => {
    return (
      [
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
      ] as Meta[]
    ).concat(meta ?? [])
  }, [meta, metaDescription, title])

  return (
    <Helmet
      title={title}
      meta={metaData}
      htmlAttributes={{ lang }}
      titleTemplate={titleTemplate}
    />
  )
}

export default SeoMeta
