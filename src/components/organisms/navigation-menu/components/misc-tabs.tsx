import { LocalizedLink } from "gatsby-theme-i18n"
import React, { useMemo } from "react"
import LanguagePicker from "~components/molecules/language-picker"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import * as Styled from "../style"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { NAV_MODES } from "../nav-menu-context"
import { HypothesisIconButton } from "~components/molecules/hypothesis-btn"

//@ts-ignore
import SearchSVG from "../../../../images/icons/magnifying_glass.svg"
//@ts-ignore
import ThemeMode from "../../../../images/icons/jasna_ciemna.svg"

interface Props {
  currentPath: string
  locale: string
  aside?: boolean
  disableThemeSwitching?: boolean
}

const MiscTabs: React.FC<Props> = ({
  currentPath,
  locale,
  aside,
  disableThemeSwitching = false,
}) => {
  const { themeMode, setThemeMode } = useThemeSwitcherContext()
  const { navMode } = useNavMenuContext()

  const getIconStyles = (defaultInvert: number) => {
    let invert = defaultInvert
    if (aside && themeMode === THEME_MODES.DARK) {
      invert = !!defaultInvert ? 0 : 1
    }

    if (!aside && themeMode !== THEME_MODES.DARK) {
      invert = !!defaultInvert ? 0 : 1
    }

    return { filter: `invert(${invert})` }
  }

  const changeThemeMode = () => {
    setThemeMode(prev =>
      prev === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT
    )
  }

  const themeIconStyles = useMemo(() => getIconStyles(1), [themeMode])
  const searchIconStyles = useMemo(() => getIconStyles(0), [themeMode])

  return (
    <>
      <LanguagePicker
        alwaysDark={aside}
        currentPath={currentPath}
        compact={aside}
      />
      {navMode !== NAV_MODES.PERMANENT && !disableThemeSwitching && (
        <Styled.TabButton onClick={changeThemeMode}>
          <img
            style={themeIconStyles}
            className="sizeable-icon"
            src={ThemeMode}
            alt="Light/dark"
          />
        </Styled.TabButton>
      )}
      {!aside ? (
        <HypothesisIconButton component={Styled.TabButton} small={aside} />
      ) : null}
      <Styled.TabButton small={aside}>
        <LocalizedLink to="/search" language={locale}>
          <Styled.SearchImg
            height={20}
            style={searchIconStyles}
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
