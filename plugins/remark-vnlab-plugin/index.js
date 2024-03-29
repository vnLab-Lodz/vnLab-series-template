const visit = require(`unist-util-visit`)
const remove = require("unist-util-remove")

import * as Footnotes from "./footnotes"
import * as Tags from "./tags"

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

module.exports = async ({ markdownAST: tree, ...util }) => {
  const footnotes = []
  visit(tree, visitTypes, node => Footnotes.traverse(node, footnotes, util))
  visit(tree, Footnotes.isFootnotes, node =>
    Footnotes.extractContents(node, footnotes, util)
  )
  remove(tree, Footnotes.isFootnotes)

  const tags = new Map()
  let marker = 0
  visit(tree, visitTypes, (node, index) =>
    Tags.traverse(node, tags, util, index, marker++)
  )

  await Promise.all([
    Footnotes.createNodesFromFootnotes(footnotes, util),
    Tags.createNodesFromAnchors(tags, util),
  ])

  return tree
}
