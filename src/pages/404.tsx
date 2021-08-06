import * as React from "react"
import { useTranslation } from "react-i18next"
import Layout from "~components/layout"
import SeoMeta from "~components/meta"

const NotFoundPage = () => {
  const { t } = useTranslation("404")

  return (
    <Layout>
      <SeoMeta title="404: Not found" />
      <h1>{t("not-found")}</h1>
      <p>{t("route-invalid")}</p>
    </Layout>
  )
}

export default NotFoundPage
