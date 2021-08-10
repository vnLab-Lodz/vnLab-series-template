import React from "react"
import { GridConstraint, GridContainer } from "~styles/grid"

const Layout: React.FC = ({ children }) => {
  return (
    <GridContainer>
      <GridConstraint>{children}</GridConstraint>
    </GridContainer>
  )
}

export default Layout
