import React from "react"
import * as Styled from "./style"
import { useTranslation } from "react-i18next"

//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

const SearchInput = () => {
  const { t } = useTranslation("common")

  return (
    <Styled.Form>
      <Styled.Input placeholder={t("search_phrase")} />
      <Styled.SubmitBtn>
        <img src={SearchSVG} alt="Magnifying glass" />
      </Styled.SubmitBtn>
    </Styled.Form>
  )
}

export default SearchInput
