import { navigate } from "gatsby-link"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import useHypothesis from "src/hooks/useHypothesis"

//@ts-ignore
import HypothesisIcon from "../../../images/icons/hypothesis.svg"

function getHypothesistutorialStatus() {
  return !!localStorage.getItem("hypothesisTutorialViewed")
}

const HypothesisBtn = () => {
  const { t } = useTranslation("common")
  const [hypothesisTutorialViewed, setHypothesisTutorialViewed] = useState(
    getHypothesistutorialStatus()
  )
  const { showHypothesis, hideHypothesis, isHidden } = useHypothesis()
  const { locale, defaultLang, prefixDefault, localizedPath } =
    useLocalization()

  const handleTextBtnClick = () => {
    if (!!!hypothesisTutorialViewed) {
      localStorage.setItem("hypothesisTutorialViewed", "true")
      setHypothesisTutorialViewed(true)
    }

    // disabled till the view is available
    false &&
      navigate(
        localizedPath({
          defaultLang,
          prefixDefault,
          locale,
          path: "/hypothesis-tutorial",
        }),
        {}
      )
  }

  const handleIconBtnClick = () => {
    isHidden() ? showHypothesis() : hideHypothesis()
  }

  return hypothesisTutorialViewed ? (
    <Styled.IconButton onClick={handleIconBtnClick}>
      <img src={HypothesisIcon} alt="Hypothesis Icon" />
    </Styled.IconButton>
  ) : (
    <Styled.TextButton>
      <Styled.VerticalText onClick={handleTextBtnClick}>
        {t("hypothesis_btn")}
      </Styled.VerticalText>
    </Styled.TextButton>
  )
}

export default HypothesisBtn
