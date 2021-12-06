import { useEffect, useState } from "react"

export default function useHypothesis() {
  const [hypothesis, setHypothesis] = useState<Element | null>(null)

  const getHypothesis = () => {
    if (hypothesis !== null) return hypothesis

    const el = document.querySelector("hypothesis-sidebar")
    setHypothesis(el)
    return el
  }

  useEffect(() => {
    if (hypothesis !== null) return

    const el = document.querySelector("hypothesis-sidebar")
    setHypothesis(el)
  }, [hypothesis])

  const isHidden = () => {
    const h = getHypothesis()
    if (!!!h) return true

    return h.classList.contains("invisible")
  }

  const hideHypothesis = () => {
    const h = getHypothesis()
    if (!!!h || isHidden()) return

    h.classList.add("invisible")
  }

  const showHypothesis = () => {
    const h = getHypothesis()
    if (!!!h || !isHidden()) return

    h.classList.remove("invisible")
  }

  return { hypothesis: getHypothesis, showHypothesis, hideHypothesis, isHidden }
}
