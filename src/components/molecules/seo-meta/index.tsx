import React, { DetailedHTMLProps, MetaHTMLAttributes, useMemo } from "react"
import { Helmet } from "react-helmet"
import { PageProps } from "gatsby"
import { LangKey } from "../../../types/config"
import { useTranslation } from "react-i18next"

import config from "publication/publication.config.json"

type Meta = DetailedHTMLProps<
  MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>

interface Props {
  lang?: LangKey
  title: string
  description?: string
  meta?: Meta[]
  url: PageProps["location"]["pathname"]
}

const SeoMeta: React.FC<Props> = ({
  description,
  url,
  meta,
  title,
  lang = "en",
}) => {
  const { t } = useTranslation("common")
  const configMeta = config[lang]
  if (!configMeta) {
    console.error(`Metadata for locale (${lang}) is not defined.`)
  }

  const defaultTitle = t("title", configMeta.title)
  const titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : undefined

  const metaDescription = useMemo(
    () => description ?? configMeta.description,
    [description, configMeta.description]
  )

  const image = `${config.siteUrl}/images/card_${lang}.png`

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
          content: configMeta.twitterHandle || ``,
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
          content: "https://archive-as-project.vnlab.org",
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
