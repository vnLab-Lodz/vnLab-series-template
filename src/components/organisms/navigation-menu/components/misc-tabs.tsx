import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import React, { useMemo } from "react"
import LanguagePicker from "~components/molecules/language-picker"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import * as Styled from "../style"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import { NAV_MODES } from "../nav-menu-context"
import { HypothesisIconButton } from "~components/molecules/hypothesis-btn"
import { navigate } from "gatsby"

import SearchSVG from "../../../../images/icons/magnifying_glass.svg"
import ThemeMode from "../../../../images/icons/jasna_ciemna.svg"
import DownloadSVG from "../../../../images/icons/arrow_down.svg"
import { useTranslation } from "react-i18next"

interface Props {
  currentPath: string
  aside?: boolean
  disableThemeSwitching?: boolean
}

const MiscTabs: React.FC<Props> = ({
  currentPath,
  aside,
  disableThemeSwitching = false,
}) => {
  const { setThemeMode } = useThemeSwitcherContext()
  const { navMode } = useNavMenuContext()
  const { t } = useTranslation()
  const { locale, localizedPath, defaultLang, prefixDefault } =
    useLocalization()

  const changeThemeMode = () => {
    setThemeMode(prev =>
      prev === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT
    )
  }

  const downloadPublication = () => {
    if (confirm(t("common:sw_download"))) {
      const dialog = document.getElementById("sw-dialog")
      const messageChannel = new MessageChannel()

      navigator.serviceWorker.controller?.postMessage({ type: "INIT_PORT" }, [
        messageChannel.port2,
      ])

      messageChannel.port1.onmessage = event => {
        console.log(event)

        if (event.data?.type === "START_DOWNLOAD") {
          if (dialog) dialog.dataset.visible = "true"
        } else if (event.data?.type === "END_DOWNLOAD") {
          if (dialog) dialog.dataset.visible = "false"
        }
      }

      navigator.serviceWorker.controller?.postMessage({
        type: "CACHE_PUBLICATION",
      })
    }
  }

  const searchPath = localizedPath({
    locale,
    prefixDefault,
    defaultLang,
    path: "/search",
  })

  return (
    <>
      {navMode !== NAV_MODES.PERMANENT && !disableThemeSwitching && (
        <Styled.TabButton onClick={changeThemeMode}>
          <img
            height={20}
            width={17}
            style={{ objectPosition: "left top", objectFit: "contain" }}
            className="sizeable-icon"
            src={ThemeMode}
            alt="Light/dark"
          />
        </Styled.TabButton>
      )}
      {!aside ? (
        <HypothesisIconButton
          ignoreTheme
          component={Styled.TabButton}
          small={aside}
        />
      ) : null}
      <Styled.TabButton
        small={aside}
        tabIndex={0}
        role="link"
        data-href={searchPath}
        onClick={() => navigate(searchPath)}
        onKeyDown={e => {
          if (e.key === "Enter") navigate(searchPath)
        }}
      >
        <Styled.SearchImg
          height={20}
          className="sizeable-icon"
          src={SearchSVG}
          alt="Magnifying glass"
        />
      </Styled.TabButton>
      <Styled.TabButton
        small={aside}
        tabIndex={0}
        onClick={downloadPublication}
        onKeyDown={e => {
          if (e.key === "Enter") downloadPublication()
        }}
      >
        <Styled.SearchImg
          height={20}
          className="sizeable-icon"
          src={DownloadSVG}
          alt="Download publication"
        />
      </Styled.TabButton>
      <LanguagePicker currentPath={currentPath} compact={aside} />
    </>
  )
}

export default MiscTabs
