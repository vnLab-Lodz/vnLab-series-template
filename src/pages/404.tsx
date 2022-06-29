import { PageProps } from "gatsby"
import * as React from "react"
import { useTranslation } from "react-i18next"
import SeoMeta from "~components/meta"
import { GridConstraint, GridContainer } from "~styles/grid"

const NotFoundPage: React.FC<PageProps> = ({ location }) => {
  const { t } = useTranslation("404")

  return (
    <GridContainer>
      <SeoMeta title="404: Not found" url={location.pathname} />
      <GridConstraint>
        <h1>{t("not-found")}</h1>
        <p>{t("route-invalid")}</p>
      </GridConstraint>
    </GridContainer>
  )
}

export default NotFoundPage
