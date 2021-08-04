import { getLocales } from "./locale"

export const localizeSlug = (slug: string): string[] =>
  getLocales().map(locale => `${slug}.${locale}`)

export const delocalizeSlug = (slug: string): string =>
  slug.replace(/\.(pl|en)/, "")
