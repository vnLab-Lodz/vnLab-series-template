import React, { useEffect } from "react"
import useHypothesis from "src/hooks/useHypothesis"

const HypothesisManager: React.FC = ({ children }) => {
  const { hypothesis, hideHypothesis } = useHypothesis()

  useEffect(() => {
    hideHypothesis()
  }, [hypothesis])

  return <>{children}</>
}

export default HypothesisManager
