import React, { ChangeEventHandler, useState } from "react"
import * as Styled from "./style"
import { useTranslation } from "react-i18next"

//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

interface Props {
  setQuery?: (query: string) => void
  onSubmit?: (value: string) => void
}

const SearchInput: React.FC<Props> = ({ setQuery, onSubmit }) => {
  const [value, setValue] = useState("")
  const { t } = useTranslation("common")

  return (
    <Styled.Form
      onSubmit={e => {
        e.preventDefault()
        if (onSubmit) onSubmit(value)
      }}
    >
      <Styled.Input
        placeholder={t("search_phrase")}
        value={value}
        onChange={e => {
          setValue(e.target.value)
          if (setQuery) setQuery(e.target.value)
        }}
      />
      <Styled.SubmitBtn>
        <img src={SearchSVG} alt="Magnifying glass" />
      </Styled.SubmitBtn>
    </Styled.Form>
  )
}

export default SearchInput
