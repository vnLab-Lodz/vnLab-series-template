import React, { createContext, useState } from "react"

export enum NAV_MODES {
  LIGHT,
  DARK,
}

interface Context {
  navMode: NAV_MODES
  setNavMode: (mode: NAV_MODES) => void
  toggleNav: () => void
  setToggleNav: React.Dispatch<React.SetStateAction<() => void>>
}

export const NavMenuContext = createContext<Context>({
  navMode: NAV_MODES.LIGHT,
  setNavMode: () => {},
  toggleNav: () => {},
  setToggleNav: () => {},
})

const NavMenuProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<NAV_MODES>(NAV_MODES.LIGHT)
  const [toggleNav, setToggleNav] = useState<() => void>(() => {})

  const setNavMode = (mode: NAV_MODES) => setMode(mode)

  return (
    <NavMenuContext.Provider
      value={{ navMode: mode, setNavMode, toggleNav, setToggleNav }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export default NavMenuProvider
