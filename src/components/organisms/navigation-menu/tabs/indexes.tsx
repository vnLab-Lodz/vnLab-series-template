import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "../style"

import indexes from "../../../../../meta/indexes.json"

interface IndexeType {
  [key: string]: string[]
}

const alphabetSort = (a: string, b: string) => a.localeCompare(b)

function sortIndexes(indexes: IndexeType): IndexeType {
  const sortedKeys = Object.keys(indexes).sort(alphabetSort)

  return sortedKeys.reduce((prev, key) => {
    return { ...prev, [key]: indexes[key].sort(alphabetSort) }
  }, {})
}

enum TAB_STATES {
  AUTHORS = "authors",
  ILLUSTRATIONS = "illustrations",
  PLACES = "places",
  PEOPLE = "people",
}

const Indexes: React.FC = () => {
  const [tabState, setTabState] = useState<TAB_STATES>(TAB_STATES.AUTHORS)
  const { t } = useTranslation("nav-menu")

  const sortedIndexes = sortIndexes(indexes[tabState])

  return (
    <Styled.IndexesWrapper>
      <Styled.IndexesTabs>
        <Styled.TabItems>
          <Styled.TabButton onClick={() => setTabState(TAB_STATES.AUTHORS)}>
            <Styled.TabButtonText active={tabState === TAB_STATES.AUTHORS}>
              {t("index_tabs.authors")}
            </Styled.TabButtonText>
          </Styled.TabButton>
          <Styled.TabButton
            onClick={() => setTabState(TAB_STATES.ILLUSTRATIONS)}
          >
            <Styled.TabButtonText
              active={tabState === TAB_STATES.ILLUSTRATIONS}
            >
              {t("index_tabs.illustrations")}
            </Styled.TabButtonText>
          </Styled.TabButton>
          <Styled.TabButton onClick={() => setTabState(TAB_STATES.PLACES)}>
            <Styled.TabButtonText active={tabState === TAB_STATES.PLACES}>
              {t("index_tabs.places")}
            </Styled.TabButtonText>
          </Styled.TabButton>
          <Styled.TabButton onClick={() => setTabState(TAB_STATES.PEOPLE)}>
            <Styled.TabButtonText active={tabState === TAB_STATES.PEOPLE}>
              {t("index_tabs.people")}
            </Styled.TabButtonText>
          </Styled.TabButton>
        </Styled.TabItems>
      </Styled.IndexesTabs>
      <Styled.ActiveTabWrapper>
        {Object.keys(sortedIndexes).map(key => {
          return (
            <>
              <Styled.IndexLetter>{key.toUpperCase()}</Styled.IndexLetter>
              {sortedIndexes[key].map(o => (
                <Styled.IndexText>{o}</Styled.IndexText>
              ))}
            </>
          )
        })}
      </Styled.ActiveTabWrapper>
    </Styled.IndexesWrapper>
  )
}

export default Indexes
