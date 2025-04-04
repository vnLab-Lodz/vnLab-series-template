import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

import ArrowDownSVG from "src/images/icons/arrow_down.svg"

const TitleSlide: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { t } = useTranslation("common")

  const scroll = () => window.scrollBy({ top: 300 })

  return (
    <Styled.TextContainer>
      <Styled.Label>{t("graphical")}</Styled.Label>
      {children}
      <Styled.ScrollButton onClick={scroll}>
        <img src={ArrowDownSVG} alt="Arrow down" />
      </Styled.ScrollButton>
    </Styled.TextContainer>
  )
}

export default TitleSlide
