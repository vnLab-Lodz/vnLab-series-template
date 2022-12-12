import { createContext, useContext } from "react"

export type MdxContext = { id: string }

export const MdxContext = createContext<MdxContext | undefined>(undefined)

export const useMdxContext = () => {
  const context = useContext(MdxContext)

  if (typeof context === "undefined") {
    throw new Error("useMdxContext can only be used within MdxContext.Provider")
  }

  return context
}
