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
//@ts-ignore
import XSVG from "../../../images/icons/x.svg"

function getHypothesisTutorialStatus() {
  return !!localStorage.getItem("hypothesisTutorialViewed")
}

interface Props {
  left?: boolean
  hiddenOnMobile?: boolean
}

const HypothesisBtn: React.FC<Props> = ({ left, hiddenOnMobile = false }) => {
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

  const setHypothesisTutorialViewedInLocalStorage = () => {
    if (!!!hypothesisTutorialViewed) {
      localStorage.setItem("hypothesisTutorialViewed", "true")
      setHypothesisTutorialViewed(true)
    }
  }

  const handleTextBtnClick = () => {
    setHypothesisTutorialViewedInLocalStorage()

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

  const closeAnnotateBtn = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setHypothesisTutorialViewedInLocalStorage()
  }

  if (!isClient || hiddenOnMobile) return <></>

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
      <Styled.CloseBtn src={XSVG} alt="X" onClick={closeAnnotateBtn} />
    </Styled.TextButton>
  )
}

export default HypothesisBtn
