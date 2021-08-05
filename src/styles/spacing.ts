import { ElementType } from "../types"

const keys = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"] as const

type Key = ElementType<typeof keys>
type Spacing = { [Property in Key]: `var(--space-${Property})` }

const spacing = keys.reduce<Spacing>(
  (prev, current) => ({
    ...prev,
    [current]: `var(--space-${current})`,
  }),
  {} as Spacing
)

export default spacing
