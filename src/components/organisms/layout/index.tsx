import React, { PropsWithChildren } from "react"
import { GridConstraint, GridContainer } from "~styles/grid"

interface Props {
  className?: string
}

const Layout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <GridContainer flexible className={className}>
      <GridConstraint>{children}</GridConstraint>
    </GridContainer>
  )
}

export default Layout
