import { useEffect } from "react"
import useHypothesisContext from "./useHypothesisContext"

export default function useHypothesis() {
  const { hypothesis } = useHypothesisContext()

  useEffect(() => {
    if (hypothesis !== null) return

    const el = document.querySelector("hypothesis-sidebar")
  }, [hypothesis])

  const isHidden = () => {
    if (!!!hypothesis) return true

    return hypothesis.classList.contains("invisible")
  }

  const hideHypothesis = () => {
    if (!!!hypothesis || isHidden()) return

    hypothesis.classList.add("invisible")
  }

  const showHypothesis = () => {
    if (!!!hypothesis || !isHidden()) return

    hypothesis.classList.remove("invisible")
  }

  return { hypothesis, showHypothesis, hideHypothesis, isHidden }
}
