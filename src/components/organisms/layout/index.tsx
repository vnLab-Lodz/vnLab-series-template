import React from "react"
import { GridConstraint, GridContainer } from "~styles/grid"

interface Props {
  className?: string
}

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <GridContainer className={className}>
      <GridConstraint>{children}</GridConstraint>
    </GridContainer>
  )
}

export default Layout
