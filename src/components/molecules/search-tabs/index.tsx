import React, { useEffect } from "react"
import * as Styled from "./style"
import { useMotionTemplate, useSpring } from "framer-motion"
import { useTranslation } from "react-i18next"
import { TABS as SEARCH_TABS } from "src/pages/search"

interface Props {
  tab: SEARCH_TABS
  setTab:
    | ((tab: SEARCH_TABS) => void)
    | React.Dispatch<React.SetStateAction<SEARCH_TABS>>
}

const SearchTabs: React.FC<Props> = ({ tab, setTab }) => {
  const { t } = useTranslation("common")

  const leftVal = useSpring((100 / 3) * 2)
  const rightVal = useSpring(0)
  const left = useMotionTemplate`${leftVal}%`
  const right = useMotionTemplate`${rightVal}%`

  useEffect(() => {
    const leftTab = tab === SEARCH_TABS.TITLES
    const middleTab = tab === SEARCH_TABS.FOOTNOTES
    const rightTab = tab === SEARCH_TABS.EVERYWHERE

    let leftOffset = 0
    let rightOffset = 0

    if (leftTab) {
      leftOffset = 0
      rightOffset = (100 / 3) * 2
    }

    if (middleTab) {
      leftOffset = 100 / 3
      rightOffset = 100 / 3
    }

    if (rightTab) {
      leftOffset = (100 / 3) * 2
      rightOffset = 0
    }

    leftVal.set(leftOffset)
    rightVal.set(rightOffset)
  }, [tab])

  return (
    <Styled.Tabs>
      <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.TITLES)}>
        {t("search_titles")}
      </Styled.SearchInBtn>
      <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.FOOTNOTES)}>
        {t("search_footnotes")}
      </Styled.SearchInBtn>
      <Styled.SearchInBtn onClick={() => setTab(SEARCH_TABS.EVERYWHERE)}>
        {t("search_everywhere")}
      </Styled.SearchInBtn>
      <Styled.Underline style={{ left, right }} />
    </Styled.Tabs>
  )
}

export default SearchTabs
