import { useContext } from "react"
import { NavMenuContext } from "~components/organisms/navigation-menu/nav-menu-context"

export default function useNavMenuContext() {
  const context = useContext(NavMenuContext)

  if (context === undefined)
    throw new Error(
      "useNavMenuContext can not be used outside a NavMenuProvider"
    )

  return context
}
