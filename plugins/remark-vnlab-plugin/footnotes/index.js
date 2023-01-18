const u = require("unist-builder")
import { v4 } from "uuid"

// ? Could be interesting to look at this ↓
// ? https://gitlab.com/staltz/unist-util-flatmap
function traverse(node, footnotesNodes, util) {
  const textIndexes = []

  node.children.forEach((child, i) => {
    if (child.type === "text") textIndexes.push(i)
  })

  if (textIndexes.length === 0) return

  for (let i = textIndexes.length - 1; i >= 0; i--) {
    const index = textIndexes[i]
    const childNode = node.children[index]

    const newChildren = constructNewChildren(childNode, util, footnotesNodes)
    if (newChildren.length < 3) continue

    node.children.splice(index, 1, ...newChildren)
  }
}

function constructNewChildren(textNode, util, footnotesNodes, children = []) {
  const regexp = new RegExp(
    /(\([^\)]*\)|[\S.]*|\({2}[^\)]*\)[^\)]*\){1}):{{\^\d*}}/,
    "g"
  )
  const match = regexp.exec(textNode.value)
  if (match === null) return children.length > 0 ? children : [textNode]

  const [rawWord, rawFootnote] = match[0].split(":{{^")
  const word = rawWord.startsWith("((") ? rawWord.slice(1, -1) : rawWord
  const footnote = rawFootnote.slice(0, -2)
  const parts = textNode.value.split(match[0])
  if (parts.length > 2) {
    throw new Error("There might be two of the same footnote in the text")
  }

  footnotesNodes.push({
    word,
    footnote,
    content: "",
    uid: `footnote__${util.markdownNode.id}--${footnote}`,
  })

  const newChildren = [
    u("text", parts[0]),
    u("jsx", `<FootnoteTarget id="footnote--${footnote}" index="${footnote}">`),
    u("text", word),
    u("jsx", `<FootnoteIndex>${footnote}</FootnoteIndex></FootnoteTarget>`),
    u("text", parts[1]),
  ]

  if (children.length > 0) {
    children.splice(children.length - 1, 1, ...newChildren)
  } else {
    children.push(...newChildren)
  }

  return constructNewChildren(
    children[children.length - 1],
    util,
    footnotesNodes,
    children
  )
}

function extractContents(node, footnotesNodes, util) {
  if (node.lang !== "footnotes") return

  const rawFootnotes = node.value.split("\n")

  rawFootnotes.forEach(footnote => {
    const raw = footnote.split("}}:")
    const index = raw[0].slice(3)
    const content = raw[1].trim()
    const i = footnotesNodes.findIndex(n => n.footnote === index)
    if (typeof i === "number") footnotesNodes[i].content = content
  })
}

async function createNodesFromFootnotes(footnotes, util) {
  const promises = []
  footnotes.forEach(({ word, footnote, content: footnoteContent, uid }) => {
    const content = {
      index: footnote,
      content: footnoteContent,
      target: word,
      link: `#footnote--${footnote}`,
    }
    promises.push(
      util.actions.createNode({
        ...content,
        id: util.createNodeId(`FOOTNOTES__${uid}`),
        children: [],
        mdx: util.markdownNode.id,
        internal: {
          type: "Footnotes",
          content: JSON.stringify(content),
          contentDigest: util.createContentDigest(content),
        },
      })
    )
  })

  await Promise.all(promises)
}

function isFootnotes(node) {
  return node.type === "code" && node.lang === "footnotes"
}

export { traverse, isFootnotes, extractContents, createNodesFromFootnotes }
