import React from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

const Edition = () => {
  const { t } = useTranslation("common")

  return (
    <Styled.EdtitionWrapper>
      <Styled.Text>{t("edition", { vol: 1 })}</Styled.Text>
      <Styled.Button>{t("changes")}</Styled.Button>
    </Styled.EdtitionWrapper>
  )
}

export default Edition
