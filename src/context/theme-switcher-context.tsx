import config from "publication/publication.config.json"
import React, { createContext, useState } from "react"

export enum THEME_MODES {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeSwitcherContextType =
  | {
      themeMode: THEME_MODES
      setThemeMode: React.Dispatch<React.SetStateAction<THEME_MODES>>
    }
  | undefined

export const ThemeSwitcherContext =
  createContext<ThemeSwitcherContextType>(undefined)

type Component = React.FC<{
  children?:
    | ((props: {
        themeMode: THEME_MODES
        setThemeMode: React.Dispatch<React.SetStateAction<THEME_MODES>>
      }) => React.ReactNode)
    | React.ReactNode
  defaultMode?: THEME_MODES
}>

const DEFAULT_THEME = getDefaultTheme()

export const ThemeSwitcherProvider: Component = ({
  children,
  defaultMode = DEFAULT_THEME,
}) => {
  const [themeMode, setThemeMode] = useState(defaultMode)

  return (
    <ThemeSwitcherContext.Provider value={{ themeMode, setThemeMode }}>
      {typeof children == "function"
        ? children({ themeMode, setThemeMode })
        : children}
    </ThemeSwitcherContext.Provider>
  )
}

function getDefaultTheme() {
  // @ts-ignore theme is an optional field in the json schema
  if (!config.theme) return THEME_MODES.LIGHT
  // @ts-ignore theme is an optional field in the json schema
  return config.theme === "light" ? THEME_MODES.LIGHT : THEME_MODES.DARK
}
