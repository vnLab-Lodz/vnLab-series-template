import React, { createContext, PropsWithChildren, useState } from "react"
import { NAV_MENU_STATES } from "./types"

export enum NAV_MODES {
  LIGHT,
  DARK,
  PERMANENT,
}

interface Context {
  navMode: NAV_MODES
  setNavMode: React.Dispatch<React.SetStateAction<NAV_MODES>>
  toggleNav: (state?: NAV_MENU_STATES) => void
  setToggleNav: React.Dispatch<React.SetStateAction<() => void>>
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavMenuContext = createContext<Context | undefined>(undefined)

interface NavMenuProviderProps extends PropsWithChildren<unknown> {
  defaultMode?: NAV_MODES
}

const NavMenuProvider: React.FC<NavMenuProviderProps> = ({
  children,
  defaultMode = NAV_MODES.LIGHT,
}) => {
  const [mode, setMode] = useState<NAV_MODES>(defaultMode)
  const [isVisible, setIsVisible] = useState(true)
  const [toggleNav, setToggleNav] = useState<Context["toggleNav"]>(() => {})

  return (
    <NavMenuContext.Provider
      value={{
        navMode: mode,
        setNavMode: setMode,
        toggleNav,
        setToggleNav,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export default NavMenuProvider
