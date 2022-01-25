const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

module.exports = (props, pluginOptions = {}) => {
  console.log(props)
  const { markdownAST } = props
  const options = pluginOptions
  options.minLength = options.minLength || 4
  options.maxLength = options.maxLength

  visit(markdownAST, `text`, node => {
    let processedText = node.value
    // const words = processedText.split(" ")
    // let skip = false
    // if (options.maxLength && words.length > options.maxLength) {
    //   skip = true
    // }
    // if (options.minLength && words.length < options.minLength) {
    //   skip = true
    // }

    // // Fix possible widows if text is more than 4 words
    // if (!skip) {
    //   processedText = processedText.replace(/\s+([\S]*)(\s*)$/gm, "\u00a0$1$2")
    // }

    if (typeof node.value === "string") {
      node.value = node.value.replace(/ in /g, "\u00a0in\u00a0")
    }
  })

  return markdownAST
}
