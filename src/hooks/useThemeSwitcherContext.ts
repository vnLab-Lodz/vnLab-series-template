import { useContext } from "react"
import { ThemeSwitcherContext } from "src/context/theme-switcher-context"

export default function useThemeSwitcherContext() {
  const context = useContext(ThemeSwitcherContext)

  if (context === undefined)
    throw new Error(
      "useThemeSwitcherContext can not be used outside a ThemeSwitcherProvider"
    )

  return context
}
