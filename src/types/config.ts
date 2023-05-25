import { ElementType } from "."

const keys = ["pl", "en"] as const
export type LangKey = ElementType<typeof keys>
