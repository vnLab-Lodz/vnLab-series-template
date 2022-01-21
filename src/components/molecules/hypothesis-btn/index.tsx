import { navigate } from "gatsby-link"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import useHypothesis from "src/hooks/useHypothesis"
import useIsClient from "src/hooks/useIsClient"
import useIsMobile from "src/hooks/useIsMobile"

//@ts-ignore
import HypothesisIcon from "../../../images/icons/hypothesis.svg"

function getHypothesisTutorialStatus() {
  return !!localStorage.getItem("hypothesisTutorialViewed")
}

interface Props {
  left?: boolean
}

const HypothesisBtn: React.FC<Props> = ({ left }) => {
  const { t } = useTranslation("common")
  const { isClient } = useIsClient()
  const [hypothesisTutorialViewed, setHypothesisTutorialViewed] =
    useState(false)
  const { showHypothesis, hideHypothesis, isHidden } = useHypothesis()
  const { locale, defaultLang, prefixDefault, localizedPath } =
    useLocalization()
  const isMobile = useIsMobile()

  useEffect(() => {
    setHypothesisTutorialViewed(getHypothesisTutorialStatus())
  }, [])

  const handleTextBtnClick = () => {
    if (!!!hypothesisTutorialViewed) {
      localStorage.setItem("hypothesisTutorialViewed", "true")
      setHypothesisTutorialViewed(true)
    }

    navigate(
      localizedPath({
        defaultLang,
        prefixDefault,
        locale,
        path: "/hypothesis_tutorial",
      }),
      {}
    )
  }

  const handleIconBtnClick = () => {
    isHidden() ? showHypothesis() : hideHypothesis()
  }

  if (!isClient) return <></>

  return hypothesisTutorialViewed ? (
    <Styled.IconButton
      id="hypothesis-btn"
      onClick={handleIconBtnClick}
      left={!!left && isMobile}
    >
      <img src={HypothesisIcon} alt="Hypothesis Icon" />
    </Styled.IconButton>
  ) : (
    <Styled.TextButton>
      <Styled.VerticalText id="hypothesis-btn" onClick={handleTextBtnClick}>
        {t("hypothesis_btn")}
      </Styled.VerticalText>
    </Styled.TextButton>
  )
}

export default HypothesisBtn
