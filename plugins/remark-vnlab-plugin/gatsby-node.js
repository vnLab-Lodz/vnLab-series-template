const graphQLTypes = `
type Footnotes implements Node {
  index: String!
  link: String!
  target: String!
  content: String
  mdx: Mdx @link(by: "id" from: "mdx")
}

type Tags implements Node {
  category: String!
  keywords: [Keyword]!
  children: [Node]!
}
type Keyword {
  keyword: String!
  anchors: [Anchor]!
}
type Anchor {
  id: String!
  mdx: Mdx @link(by: "id" from: "mdx")
}
`
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(graphQLTypes)
}
