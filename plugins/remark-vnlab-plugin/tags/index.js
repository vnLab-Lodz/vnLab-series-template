const u = require("unist-builder")

function traverse(node, tags, util, index, marker) {
  const regexp = new RegExp(
    /(?:\(([^\(\)]*)\)|\({2}([^\(\)]*)\){2}):{{#([\w\s]+)}}/,
    "g"
  )

  const children = node.children.map(child => {
    if (child.type !== "text") return child
    const match = regexp.exec(child.value)
    if (match === null) return child

    return u("jsx", extractData(match, regexp, tags, util, index, marker++))
  })

  node.children = children
}

function extractData(match, regexp, tags, util, index, marker) {
  const [text, category, anchorId] = [
    match[1] || match[2],
    match[3],
    `tag-anchor__${util.markdownNode.id}--${index}-${marker}`,
  ]
  const { displayText, keyword } = extractKeyword(text)

  insertTag(tags, { keyword, category, anchorId, util })

  const nextMatch = regexp.exec(match.input)

  return insertAnchorElement(
    nextMatch
      ? extractData(nextMatch, regexp, tags, util, index, marker++)
      : match.input,
    match,
    anchorId,
    displayText
  )
}

function extractKeyword(string) {
  const [displayText, keyword] = string.split("|")
  return { displayText, keyword: keyword || displayText }
}

function insertAnchorElement(string, match, anchorId, displayText) {
  const [before, after] = [
    string.substring(0, match.index),
    string.substring(match.index + match[0].length),
  ]
  return `${before}<Tag style="font-family: inherit;" id="${anchorId}">${displayText}</Tag>${after}`
}

const insertTag = (tags, { keyword, category, anchorId, util }) => {
  const anchor = { id: anchorId, mdx: util.markdownNode.id }
  let keywords = tags.get(category)
  if (!keywords) {
    tags.set(category, new Map())
    keywords = tags.get(category)
  }

  let anchors = keywords.get(keyword)
  if (!anchors) {
    keywords.set(keyword, new Map([[anchor.id, anchor]]))
    anchors = keywords.get(keyword)
  } else {
    anchors.set(anchor.id, anchor)
  }

  const existingTag = util.getNode(util.createNodeId(`TAGS__${category}`))
  if (!existingTag) return

  const existingKeyword =
    existingTag.keywords.find(el => el.keyword === keyword) || undefined

  if (existingKeyword) {
    existingKeyword.anchors.forEach(anchor => {
      anchors.set(anchor.id, anchor)
    })
  }
}

const createNodesFromAnchors = (tags, util) => {
  for (const [category, keywords] of tags) {
    const tag = { category, keywords: [] }

    for (const [keyword, anchors] of keywords) {
      tag.keywords.push({
        keyword,
        anchors: Array.from(anchors.values()),
      })
    }
    const contentDigest = util.createContentDigest(tag)
    tag.id = util.createNodeId(`TAGS__${tag.category}`)
    tag.internal = { type: "Tags", contentDigest }
    util.actions.createNode(tag)
  }
}

export { traverse, createNodesFromAnchors }