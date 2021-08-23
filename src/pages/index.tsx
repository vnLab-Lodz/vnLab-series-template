import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import SeoMeta from "~components/meta"
import atoms from "~components/atoms"
import { getLocaleName, getLocales, isUndefined } from "~util"
import { useTranslation } from "react-i18next"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import styled from "styled-components"
import { GridContainer, GridConstraint } from "~styles/grid"
import usePublication from "src/hooks/usePublication"

const IndexPage: React.FC = () => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "home"])

  const publication = usePublication()

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
          {publication.map(link => (
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

export default IndexPage
