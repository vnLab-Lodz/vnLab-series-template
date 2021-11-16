import React, { useEffect } from "react"
import * as Styled from "./style"
import { useMotionTemplate, useSpring } from "framer-motion"
import { useTranslation } from "react-i18next"
import { SEARCH_TABS } from "~components/organisms/search-client"

interface Props {
  tab: SEARCH_TABS
  setTab: (tab: SEARCH_TABS) => void
}

const SearchTabs: React.FC<Props> = ({ tab, setTab }) => {
  const { t } = useTranslation("common")

  const leftVal = useSpring(50)
  const rightVal = useSpring(0)
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
    <Styled.Tabs>
      <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.TITLES)}>
        {t("search_titles")}
      </Styled.SearchInBtn>
      <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.EVERYWHERE)}>
        {t("search_everywhere")}
      </Styled.SearchInBtn>
      <Styled.Underline style={{ left, right }} />
    </Styled.Tabs>
  )
}

export default SearchTabs
