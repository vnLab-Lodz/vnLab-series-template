import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"
import * as Styled from "../style"

import indexes from "../../../../../meta/indexes.json"

interface IndexWithUID {
  label: string
  uid: string
}

interface IndexType {
  [key: string]: Array<string | IndexWithUID>
}

enum TAB_STATES {
  AUTHORS = "authors",
  ILLUSTRATIONS = "illustrations",
  PLACES = "places",
  PEOPLE = "people",
}

const IndexGroup: React.FC = ({ children }) => <>{children}</>

const Indexes: React.FC = () => {
  const [tabState, setTabState] = useState<TAB_STATES>(TAB_STATES.AUTHORS)
  const { locale } = useLocalization()
  const { t } = useTranslation("nav-menu")

  const sortedIndexes = sortIndexes(indexes[tabState])

  return (
    <Styled.IndexesWrapper>
      <Styled.IndexesTabs>
        <Styled.TabItems>
          {!checkIfIndexEmpty(indexes[TAB_STATES.AUTHORS]) && (
            <Styled.TabButton onClick={() => setTabState(TAB_STATES.AUTHORS)}>
              <Styled.TabButtonText active={tabState === TAB_STATES.AUTHORS}>
                {t("index_tabs.authors")}
              </Styled.TabButtonText>
            </Styled.TabButton>
          )}
          {!checkIfIndexEmpty(indexes[TAB_STATES.ILLUSTRATIONS]) && (
            <Styled.TabButton
              onClick={() => setTabState(TAB_STATES.ILLUSTRATIONS)}
            >
              <Styled.TabButtonText
                active={tabState === TAB_STATES.ILLUSTRATIONS}
              >
                {t("index_tabs.illustrations")}
              </Styled.TabButtonText>
            </Styled.TabButton>
          )}
          {!checkIfIndexEmpty(indexes[TAB_STATES.PLACES]) && (
            <Styled.TabButton onClick={() => setTabState(TAB_STATES.PLACES)}>
              <Styled.TabButtonText active={tabState === TAB_STATES.PLACES}>
                {t("index_tabs.places")}
              </Styled.TabButtonText>
            </Styled.TabButton>
          )}
          {!checkIfIndexEmpty(indexes[TAB_STATES.PEOPLE]) && (
            <Styled.TabButton onClick={() => setTabState(TAB_STATES.PEOPLE)}>
              <Styled.TabButtonText active={tabState === TAB_STATES.PEOPLE}>
                {t("index_tabs.people")}
              </Styled.TabButtonText>
            </Styled.TabButton>
          )}
        </Styled.TabItems>
      </Styled.IndexesTabs>
      <Styled.ActiveTabWrapper>
        {Object.keys(sortedIndexes).map((key, i) => {
          return (
            <IndexGroup key={`index-group__${i}--${key}`}>
              <Styled.IndexLetter>{key.toUpperCase()}</Styled.IndexLetter>
              {sortedIndexes[key].map((index, j) => {
                return (
                  <Styled.IndexText key={`index-group__${i}--${key}-${j}`}>
                    {typeof index === "string" ? (
                      index
                    ) : (
                      <Styled.BiogramLink
                        to={`/biograms/${(index as IndexWithUID).uid}`}
                        language={locale}
                      >
                        {(index as IndexWithUID).label}
                      </Styled.BiogramLink>
                    )}
                  </Styled.IndexText>
                )
              })}
            </IndexGroup>
          )
        })}
      </Styled.ActiveTabWrapper>
    </Styled.IndexesWrapper>
  )
}

function alphabetSort(a: string | IndexWithUID, b: string | IndexWithUID) {
  if (typeof a === "string" && typeof b === "string") return a.localeCompare(b)

  return (a as IndexWithUID).label.localeCompare((b as IndexWithUID).label)
}

function sortIndexes(indexes: IndexType): IndexType {
  const sortedKeys = Object.keys(indexes).sort(alphabetSort)

  return sortedKeys.reduce((prev, key) => {
    return { ...prev, [key]: indexes[key].sort(alphabetSort) }
  }, {})
}

function checkIfIndexEmpty(index: IndexType): boolean {
  return Object.keys(index).length === 0
}

export default Indexes
