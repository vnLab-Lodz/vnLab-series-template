import { useContext } from "react"
import { ScrollContext } from "src/context/scroll-context"

export default function useScrollContext() {
  const context = useContext(ScrollContext)

  if (context === undefined)
    throw new Error(
      "useScrollContext can not be used outside a ScrollContextProvider"
    )

  return context
}
