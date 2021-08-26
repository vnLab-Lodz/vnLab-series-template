import React, { createContext, useState } from "react"

export enum NAV_MODES {
  LIGHT,
  DARK,
}

interface Context {
  navMode: NAV_MODES
  setNavMode: (mode: NAV_MODES) => void
}

export const NavMenuContext = createContext<Context>({
  navMode: NAV_MODES.LIGHT,
  setNavMode: _ => {},
})

const NavMenuProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<NAV_MODES>(NAV_MODES.LIGHT)

  const setNavMode = (mode: NAV_MODES) => setMode(mode)

  return (
    <NavMenuContext.Provider value={{ navMode: mode, setNavMode }}>
      {children}
    </NavMenuContext.Provider>
  )
}

export default NavMenuProvider
