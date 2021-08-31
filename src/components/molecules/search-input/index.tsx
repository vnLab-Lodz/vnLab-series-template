import React from "react"
import * as Styled from "./style"

//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"

const SearchInput = () => {
  return (
    <Styled.Form>
      <Styled.Input />
      <Styled.SubmitBtn>
        <img src={SearchSVG} alt="Magnifying glass" />
      </Styled.SubmitBtn>
    </Styled.Form>
  )
}

export default SearchInput
