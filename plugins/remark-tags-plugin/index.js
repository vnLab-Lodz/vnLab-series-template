const visit = require(`unist-util-visit`)
const u = require("unist-builder")
import { v4 as nanoid } from "uuid"
import { extractElement } from "./utils"

const visitTypes = [
  "heading",
  "paragraph",
  "blockquote",
  "list",
  "listItem",
  "emphasis",
  "strong",
  "link",
  "linkReference",
]

function traverse(node, tags) {
  const regexp = new RegExp(/(?:\(([^\(\)]*)\)|\({2}([^\(\)]*)\){2}):{{#([\w\s]+)}}/, "g")

  const children = node.children.map(child => {
    if (child.type !== "text") return child
    const match = regexp.exec(child.value)
    if (match === null) return child

    return u("jsx", extractData(match, regexp, tags))
  })

  node.children = children
}

function extractData(match, regexp, tags) {
  const [text, category, anchorId] = [
    match[1] || match[2],
    match[3],
    `tag-anchor-${nanoid()}`,
  ]
  const { displayText, keyword } = extractKeyword(text)

  tags.push({ keyword, category, anchorId })

  const nextMatch = regexp.exec(match.input)

  return insertAnchorElement(
    nextMatch ? extractData(nextMatch, regexp, tags) : match.input,
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
  return `${before}<span style="font-family: inherit;" id="${anchorId}">${displayText}</span>${after}`
}

async function createNodesFromAnchors(anchors, util) {
  for (const currentAnchor of anchors) {
    const existingTag = util.getNode(
      util.createNodeId(`TAGS__${currentAnchor.category}`)
    )

    const [existingKeyword, otherKeywords] = extractElement(
      existingTag?.keywords || [],
      keyword => keyword.keyword === currentAnchor.keyword
    )

    const tagContent = {
      ...(existingTag || { category: currentAnchor.category }),
      keywords: [
        {
          keyword: currentAnchor.keyword,
          anchors: [
            ...(existingKeyword?.anchors || []),
            { id: currentAnchor.anchorId, mdx: util.markdownNode.id },
          ],
        },
        ...otherKeywords,
      ],
      children: [],
    }

    const tagNode = {
      ...tagContent,
      id: util.createNodeId(`TAGS__${tagContent.category}`),
      internal: {
        type: "Tags",
        contentDigest: util.createContentDigest(tagContent),
      },
    }
    await util.actions.createNode(tagNode)
  }
}

module.exports = async ({ markdownAST: tree, ...util }) => {
  const tags = []
  visit(tree, visitTypes, node => traverse(node, tags))
  await createNodesFromAnchors(tags, util)
  return tree
}