import React, { CSSProperties } from "react"
import * as Styled from "./style"

interface Props {
  style?: CSSProperties
}

const Abstract: React.FC<Props> = ({ children, style }) => {
  return <Styled.AbstractText style={style}>{children}</Styled.AbstractText>
}

export default Abstract
