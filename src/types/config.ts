import config from "publication/publication.config.json"

type ConfigKeys = keyof typeof config
export type LangKey = Exclude<
  ConfigKeys,
  "$schema" | "singleAuthorMode" | "languages" | "siteUrl"
>
