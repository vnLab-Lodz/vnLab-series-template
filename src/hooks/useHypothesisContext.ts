import { useContext } from "react"
import { HypothesisContext } from "src/context/hypothesis-context"

export default function useHypothesisContext() {
  const context = useContext(HypothesisContext)

  if (context === undefined)
    throw new Error(
      "useHypothesisContext can not be used outside a HypothesisContextProvider"
    )

  return context
}
