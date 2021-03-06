import React, { createContext, useState, PropsWithChildren } from "react"

interface Context {
  isPaused: boolean
  setIsPaused: (isPaused: boolean) => void
}

export const ScrollContext = createContext<Context | undefined>(undefined)

const ScrollContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <ScrollContext.Provider value={{ isPaused, setIsPaused }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollContextProvider
