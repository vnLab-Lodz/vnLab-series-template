import React, { useState, useEffect } from "react"
import * as Styled from "./style"
import { useTranslation } from "react-i18next"

//@ts-ignore
import SearchSVG from "../../../images/icons/magnifying_glass.svg"
import { motion, useMotionTemplate, useSpring } from "framer-motion"

enum SEARCH_TABS {
  TITLES,
  EVERYWHERE,
}

const SearchInput = () => {
  const [tab, setTab] = useState(SEARCH_TABS.TITLES)
  const { t } = useTranslation("common")

  const leftVal = useSpring(0)
  const rightVal = useSpring(50)
  const left = useMotionTemplate`${leftVal}%`
  const right = useMotionTemplate`${rightVal}%`

  useEffect(() => {
    const leftTab = tab === SEARCH_TABS.TITLES
    const leftOffset = leftTab ? 0 : 50
    const rightOffset = leftTab ? 50 : 0

    leftVal.set(leftOffset)
    rightVal.set(rightOffset)
  }, [tab])

  return (
    <>
      <Styled.Form>
        <Styled.Input placeholder={t("search_phrase")} />
        <Styled.SubmitBtn>
          <img src={SearchSVG} alt="Magnifying glass" />
        </Styled.SubmitBtn>
      </Styled.Form>
      <Styled.Tabs>
        <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.TITLES)}>
          {t("search_titles")}
        </Styled.SearchInBtn>
        <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.EVERYWHERE)}>
          {t("search_everywhere")}
        </Styled.SearchInBtn>
        <Styled.Underline style={{ left, right }} />
      </Styled.Tabs>
    </>
  )
}

export default SearchInput
