import React from "react"
import * as Styled from "./style"

const Author: React.FC = ({ children }) => {
  return <Styled.H3 type="primary">{children}</Styled.H3>
}

export default Author
