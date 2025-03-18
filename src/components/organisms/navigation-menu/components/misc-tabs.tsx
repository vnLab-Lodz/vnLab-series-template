import { navigate } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"
import { THEME_MODES } from "src/context/theme-switcher-context"
import useNavMenuContext from "src/hooks/useNavMenuContext"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { HypothesisIconButton } from "~components/molecules/hypothesis-btn"
import LanguagePicker from "~components/molecules/language-picker"
import { NAV_MODES } from "../nav-menu-context"
import * as Styled from "../style"

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
      {!aside ? (
        <HypothesisIconButton
          ignoreTheme
          component={Styled.TabButton}
          small={aside}
        />
      ) : null}

      <Styled.TabButton
        title={t("common:icons.download")}
        small={aside}
        tabIndex={0}
        onClick={downloadPublication}
        onKeyDown={e => {
          if (e.key === "Enter") downloadPublication()
        }}
      >
        <svg
          height={20}
          width="auto"
          className="sizeable-icon"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M8.46002 0.5V9.13999"
            stroke="white"
            stroke-miterlimit="10"
          />
          <path
            d="M5.90002 7.05999L8.46002 11.38L11.02 7.05999H5.98002H5.90002Z"
            fill="white"
          />
          <path
            d="M1.17999 16.02H15.74"
            stroke="white"
            stroke-miterlimit="10"
          />
          <path d="M1.42004 16.5V12.82" stroke="white" stroke-miterlimit="10" />
          <path d="M15.2599 16.5V12.82" stroke="white" stroke-miterlimit="10" />
        </svg>
      </Styled.TabButton>
      {navMode !== NAV_MODES.PERMANENT && !disableThemeSwitching && (
        <Styled.TabButton
          onClick={changeThemeMode}
          title={t("common:icons.theme")}
        >
          <svg
            height={20}
            width="auto"
            className="sizeable-icon"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M8.73999 1.3C12.74 1.3 15.94 4.5 15.94 8.5C15.94 12.5 12.74 15.7 8.73999 15.7C4.73999 15.7 1.53999 12.5 1.53999 8.5C1.53999 4.5 4.73999 1.3 8.73999 1.3ZM8.73999 0.5C4.33999 0.5 0.73999 4.1 0.73999 8.5C0.73999 12.9 4.33999 16.5 8.73999 16.5C13.14 16.5 16.74 12.9 16.74 8.5C16.74 4.1 13.14 0.5 8.73999 0.5Z"
              fill="white"
            />
            <path
              d="M0.73999 8.5C0.73999 12.9 4.33999 16.5 8.73999 16.5V0.5C4.33999 0.5 0.73999 4.1 0.73999 8.5Z"
              fill="white"
            />
          </svg>
        </Styled.TabButton>
      )}
      <Styled.TabButton
        title={t("common:icons.search")}
        small={aside}
        tabIndex={0}
        role="link"
        data-href={searchPath}
        onClick={() => navigate(searchPath)}
        onKeyDown={e => {
          if (e.key === "Enter") navigate(searchPath)
        }}
      >
        <svg
          height={20}
          width="auto"
          className="sizeable-icon"
          viewBox="0 0 18 17"
          fill="none"
        >
          <path
            d="M12.8414 12.1142L17.146 16.5"
            stroke="white"
            stroke-miterlimit="10"
          />
          <path
            d="M8.04963 1.31218C11.6232 1.31218 14.5471 4.23604 14.5471 7.80965C14.5471 11.3833 11.6232 14.3071 8.04963 14.3071C4.47603 14.3071 1.55217 11.3833 1.55217 7.80965C1.55217 4.23604 4.47603 1.31218 8.04963 1.31218ZM8.04963 0.5C4.06994 0.5 0.73999 3.74873 0.73999 7.80965C0.73999 11.8706 3.98872 15.1193 8.04963 15.1193C12.1105 15.1193 15.3593 11.8706 15.3593 7.80965C15.3593 3.74873 12.1105 0.5 8.04963 0.5Z"
            fill="white"
          />
        </svg>
      </Styled.TabButton>
      <LanguagePicker currentPath={currentPath} compact={aside} />
    </>
  )
}

export default MiscTabs
