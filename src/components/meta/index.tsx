import React, { DetailedHTMLProps, MetaHTMLAttributes, useMemo } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, PageProps } from "gatsby"
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
  url: PageProps["location"]["pathname"]
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
  url,
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

  const image = `https://archiveasproject.gatsbyjs.io/images/card_${lang}.png`

  const metaData: Meta[] = useMemo(() => {
    return (
      [
        {
          name: "og:image",
          content: image,
        },
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
        {
          name: "twitter:image",
          content: image,
        },
        {
          name: "twitter:domain",
          content: "archiveasproject.gatsbyjs.io",
        },
        {
          name: "twitter:url",
          content: url,
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
