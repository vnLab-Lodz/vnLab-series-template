import { createContext, useContext } from "react"

export type Footnote = {
  id: string
  link: string
  index: string
  content: string
}

export type FootnotesContext = Footnote[]

export const FootnotesContext = createContext<FootnotesContext>([])

export const useFootnotes = () => {
  const context = useContext(FootnotesContext)
  return context
}
export const useFootnote = (index: string) => {
  const footnotes = useFootnotes()
  return footnotes.find(f => f.index == index)
}
