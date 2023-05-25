const fs = require("fs")
const config = require("../publication/publication.config.json")

const locales = config.languages.map(({ startUrl, ...delegated }) => delegated)
const json = JSON.stringify(locales, null, 2) + "\n"

fs.writeFileSync(`${__dirname}/../i18n/config.json`, json)
