import { LocalizedLink } from "gatsby-theme-i18n"
import React from "react"
import LanguagePicker from "~components/molecules/language-picker"
import * as Styled from "../style"

//@ts-ignore
import SearchSVG from "../../../../images/icons/magnifying_glass.svg"

interface Props {
  currentPath: string
  locale: string
  aside?: boolean
}

const MiscTabs: React.FC<Props> = ({ currentPath, locale, aside }) => {
  return (
    <>
      <LanguagePicker
        alwaysDark={aside}
        currentPath={currentPath}
        compact={aside}
      />
      <Styled.TabButton small={aside}>
        <LocalizedLink to="/search" language={locale}>
          <Styled.SearchImg
            style={aside ? { filter: "brightness(0)" } : undefined}
            className="sizeable-icon"
            src={SearchSVG}
            alt="Magnifying glass"
          />
        </LocalizedLink>
      </Styled.TabButton>
    </>
  )
}

export default MiscTabs
