import React, { CSSProperties, PropsWithChildren } from "react"
import * as Styled from "./style"

interface Props {
  style?: CSSProperties
}

const Abstract: React.FC<PropsWithChildren<Props>> = ({ children, style }) => {
  return <Styled.AbstractText style={style}>{children}</Styled.AbstractText>
}

export default Abstract
