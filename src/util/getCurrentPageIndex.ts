import { PublicationPage } from "src/hooks/usePublication"

export function getCurrentPathIndex(
  pages: PublicationPage[],
  currentPath: string
) {
  return pages.findIndex(
    p => p.path == currentPath || `${p.path}/` == currentPath
  )
}
