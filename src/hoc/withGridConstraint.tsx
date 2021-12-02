import React, { ComponentType, PropsWithChildren } from "react"
import { GridConstraint } from "~styles/grid"

export default function <P extends object>(Component: ComponentType<P>) {
  return (props: PropsWithChildren<P>) => (
    <GridConstraint>
      <Component {...props} />
    </GridConstraint>
  )
}
