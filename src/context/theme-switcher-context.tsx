import React, { createContext, useState, PropsWithChildren } from "react"

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

export const ThemeSwitcherProvider: Component = ({
  children,
  defaultMode = THEME_MODES.LIGHT,
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
