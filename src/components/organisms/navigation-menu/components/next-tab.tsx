import React, { useCallback, useMemo } from "react"
import { TFunction, useTranslation } from "react-i18next"
import { NAV_MENU_STATES } from "../types"
import * as Styled from "../style"
import { useTags } from "../tabs/indexes"

const NextTab: React.FC<{
  navState: NAV_MENU_STATES
  setNavState: React.Dispatch<React.SetStateAction<NAV_MENU_STATES>>
}> = ({ navState, setNavState }) => {
  const tags = useTags()

  const nextTabNames = useCallback((t: TFunction<"nav-menu">) => {
    if (tags.length === 0)
      return {
        [NAV_MENU_STATES.TOC]: t("tabs.about"),
        [NAV_MENU_STATES.INDEXES]: t("tabs.about"),
        [NAV_MENU_STATES.ABOUT]: t("tabs.toc"),
      }

    return {
      [NAV_MENU_STATES.TOC]: t("tabs.indexes"),
      [NAV_MENU_STATES.INDEXES]: t("tabs.about"),
      [NAV_MENU_STATES.ABOUT]: t("tabs.toc"),
    }
  }, tags)

  const nextTabNavState = useMemo(() => {
    if (tags.length === 0)
      return {
        [NAV_MENU_STATES.TOC]: NAV_MENU_STATES.ABOUT,
        [NAV_MENU_STATES.INDEXES]: NAV_MENU_STATES.ABOUT,
        [NAV_MENU_STATES.ABOUT]: NAV_MENU_STATES.TOC,
      }

    return {
      [NAV_MENU_STATES.TOC]: NAV_MENU_STATES.INDEXES,
      [NAV_MENU_STATES.INDEXES]: NAV_MENU_STATES.ABOUT,
      [NAV_MENU_STATES.ABOUT]: NAV_MENU_STATES.TOC,
    }
  }, tags)

  const { t } = useTranslation("nav-menu")
  const tabName = nextTabNames(t)[navState]

  const setNextNavState = () => setNavState(nextTabNavState[navState])

  return (
    <Styled.NextTabButton onClick={setNextNavState}>
      {tabName}
    </Styled.NextTabButton>
  )
}

export default NextTab
