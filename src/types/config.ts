import { ElementType } from "."

const keys = ["pl", "en"] as const
export type LangKey = ElementType<typeof keys>

export type SiteMetadata = {
  [Property in LangKey]: {
    title: string
    description: string
    author: string
  }
}
