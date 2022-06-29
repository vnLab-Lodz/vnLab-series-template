import { WrapPageElementBrowserArgs, Script, ScriptStrategy } from "gatsby"
import { ThemeProvider } from "styled-components"
import { darkTheme, lightTheme } from "../src/styles/theme"
import React from "react"
import { Globals } from "../src/styles/globals"
import HypothesisManager from "~components/organisms/hypothesis-manager"
import ScrollContextProvider from "src/context/scroll-context"
import HypothesisContextProvider from "src/context/hypothesis-context"
import {
  ThemeSwitcherProvider,
  THEME_MODES,
} from "src/context/theme-switcher-context"

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => (
  <ThemeSwitcherProvider>
    {({ themeMode }: { themeMode: THEME_MODES }) => (
      <>
        <ThemeProvider
          theme={themeMode === THEME_MODES.LIGHT ? lightTheme : darkTheme}
        >
          <HypothesisContextProvider>
            <HypothesisManager>
              <ScrollContextProvider>
                <Globals />
                {element}
              </ScrollContextProvider>
            </HypothesisManager>
          </HypothesisContextProvider>
        </ThemeProvider>
        <Script
          src="https://hypothes.is/embed.js"
          strategy={ScriptStrategy.postHydrate}
        />
      </>
    )}
  </ThemeSwitcherProvider>
)
