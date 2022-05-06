import React, { useEffect, PropsWithChildren } from "react"
import useHypothesis from "src/hooks/useHypothesis"

const HypothesisManager: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { hypothesis, hideHypothesis } = useHypothesis()

  useEffect(() => {
    hideHypothesis()
  }, [hypothesis])

  return <>{children}</>
}

export default HypothesisManager
