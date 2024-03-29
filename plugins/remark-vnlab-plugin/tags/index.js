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
  return { displayText, keyword: keyword?.trim() || displayText.trim() }
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

const mergeArrWithMap = (target, array) => {
  const joined = target.concat(Array.from(array.values()))
  return [...new Map(joined.map(item => [item.id, item])).values()]
}

const createNodesFromAnchors = async (tags, util) => {
  const promises = []
  for (const [category, keywords] of tags) {
    const id = util.createNodeId(`TAGS__${category}__${util.markdownNode.id}`)
    const tag = util.getNode(id) ?? { id, category, keywords: [] }

    for (const [keyword, anchors] of keywords) {
      const item = tag.keywords.find(k => k.keyword === keyword)
      if (item) item.anchors = mergeArrWithMap(item.anchors, anchors)
      else tag.keywords.push({ keyword, anchors: mergeArrWithMap([], anchors) })
    }

    const contentDigest = util.createContentDigest(tag)
    tag.internal = { type: "Tags", contentDigest }
    promises.push(util.actions.createNode(tag))
  }

  await Promise.all(promises)
}

export { traverse, createNodesFromAnchors }
