import React from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

interface Props {
  className?: string
}

const Edition: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation("common")

  return (
    <Styled.EditionWrapper className={className}>
      <Styled.Text>{t("edition", { vol: 1 })}</Styled.Text>
      <Styled.Button>{t("changes")}</Styled.Button>
    </Styled.EditionWrapper>
  )
}

export default Edition
