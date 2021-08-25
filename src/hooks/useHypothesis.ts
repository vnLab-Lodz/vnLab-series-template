import { useEffect, useState } from "react"

export default function useHypothesis() {
  const [hypothesis, setHypothesis] = useState<Element | null>(null)

  useEffect(() => {
    const el = document.querySelector("hypothesis-sidebar")
    setHypothesis(el)
  }, [])

  return hypothesis
}
