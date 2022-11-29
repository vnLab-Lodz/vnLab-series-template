import React, { CSSProperties, PropsWithChildren } from "react"
import * as Styled from "./style"

interface Props {
  style?: CSSProperties
  className?: string
}

const Abstract: React.FC<PropsWithChildren<Props>> = ({
  children,
  style,
  className,
}) => {
  return (
    <Styled.AbstractText style={style} className={className}>
      {children}
    </Styled.AbstractText>
  )
}

export default Abstract
