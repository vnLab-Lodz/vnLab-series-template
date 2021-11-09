import React, { ChangeEventHandler } from "react"
import * as Styled from "./style"
import { useTranslation } from "react-i18next"

//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

interface Props {
  setQuery: (query: string) => void
  onSubmit?: () => void
}

const SearchInput: React.FC<Props> = ({ setQuery, onSubmit }) => {
  const { t } = useTranslation("common")

  return (
    <Styled.Form
      onSubmit={e => {
        e.preventDefault()
        onSubmit && onSubmit()
      }}
    >
      <Styled.Input
        placeholder={t("search_phrase")}
        onChange={e => setQuery(e.target.value)}
      />
      <Styled.SubmitBtn>
        <img src={SearchSVG} alt="Magnifying glass" />
      </Styled.SubmitBtn>
    </Styled.Form>
  )
}

export default SearchInput
