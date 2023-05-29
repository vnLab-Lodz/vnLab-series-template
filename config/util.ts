import config from "../publication/publication.config.json"

type Config = Omit<
  typeof config,
  "$schema" | "languages" | "siteUrl" | "singleAuthorMode"
>
type Key = keyof Config
type Metadata = Extract<Config[Key], { title: string }> &
  typeof config["languages"][number]

export const getPublicationMetadata = () => {
  return config.languages.reduce((prev, lang) => {
    const metadata = { ...config[lang.code as Key], ...lang }
    if (lang.startUrl === "/") {
      prev.default = metadata
      return prev
    }

    if (prev.localized) prev.localized.push(metadata)
    else prev.localized = [metadata]
    return prev
  }, {} as { default: Metadata; localized: Metadata[] })
}
