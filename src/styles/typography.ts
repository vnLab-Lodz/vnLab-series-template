import { ElementType } from "../types"

const keys = ["sm", "md", "lg", "xl", "xxl"] as const

type Key = ElementType<typeof keys>
type Typography = { [Property in Key]: `var(--text-${Property})` }

const typography = keys.reduce<Typography>(
  (prev, current) => ({
    ...prev,
    [current]: `var(--text-${current})`,
  }),
  {} as Typography
)

export default typography
