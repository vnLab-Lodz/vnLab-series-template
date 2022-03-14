import { useSpring } from "framer-motion"
import React, { useEffect } from "react"
import { ArrowSpan } from "./style"

interface Props {
  inverted?: boolean
}

const Arrow: React.FC<Props> = ({ inverted }) => {
  const rotate = useSpring(90)

  useEffect(() => {
    rotate.set(inverted ? -90 : 90)

    return () => {
      rotate.stop()
    }
  }, [inverted])

  return (
    <ArrowSpan style={{ rotate }} className="character-arrow">
      {">"}
    </ArrowSpan>
  )
}

export default Arrow
