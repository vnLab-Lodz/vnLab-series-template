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

interface Component extends React.FC {
  children?: (props: {
    themeMode: THEME_MODES
    setThemeMode: React.Dispatch<React.SetStateAction<THEME_MODES>>
  }) => React.ReactNode
}

export const ThemeSwitcherProvider: Component = ({ children }) => {
  const [themeMode, setThemeMode] = useState(THEME_MODES.LIGHT)

  return (
    <ThemeSwitcherContext.Provider value={{ themeMode, setThemeMode }}>
      {typeof children == "function"
        ? children({ themeMode, setThemeMode })
        : children}
    </ThemeSwitcherContext.Provider>
  )
}
