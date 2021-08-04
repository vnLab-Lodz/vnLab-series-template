import * as React from "react"
import Layout from "../components/PageLayout"
import Seo from "../components/Seo"
import { useTranslation } from "react-i18next"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

const SecondPage = () => {
  const { locale } = useLocalization()
  const { t } = useTranslation(["common", "page-two"])

  return (
    <Layout>
      <Seo title="Page two" />
      <h1>{t("page-two:this-is-second-page")}</h1>
      <p>
        {t("page-two:find-me")} <code>src/pages/page-two.tsx</code>
      </p>
      <LocalizedLink to="/" language={locale} style={{ color: "#00b140" }}>
        {t("common:go-back", { page: t("page-two:home-page") })}
      </LocalizedLink>
    </Layout>
  )
}

export default SecondPage
