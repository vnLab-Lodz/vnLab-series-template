import { CreatePagesArgs, CreateSchemaCustomizationArgs } from "gatsby"
import { delocalizeSlug, localizeSlug } from "../src/util"

const path = require(`path`)

interface Node {
  id: string
  slug: string
  frontmatter: {
    title: string
    date: string
  }
}

interface Data {
  allMdx: {
    nodes: Node[]
  }
}

function chaptersFilter(node: Node) {
  const { slug } = node

  return (
    !slug.includes("bibliography") &&
    !slug.includes("biograms") &&
    !slug.includes("hypothesis_tutorial")
  )
}

function bibliographiesFilter(node: Node) {
  return node.slug.includes("bibliography")
}

function biogramsFilter(node: Node) {
  return node.slug.includes("biograms")
}

function hypothesisFilter(node: Node) {
  return node.slug.includes("hypothesis_tutorial")
}

function composePageOptions(
  node: Node,
  options: { isPublication: boolean; template: string }
) {
  const slug = delocalizeSlug(node.slug)

  return {
    path: slug.replace("index", ""),
    component: path.resolve(`./src/templates/${options.template}.tsx`),
    context: {
      slugs: localizeSlug(slug),
      publication: options.isPublication,
    },
  }
}

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions

  const { data, errors } = await graphql<Data>(`
    query {
      allMdx(filter: { frontmatter: { meta: { ne: true } } }) {
        nodes {
          id
          frontmatter {
            title
            date
          }
          slug
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild(errors)
    return
  }

  if (!!!data) return

  const { nodes } = data.allMdx

  nodes
    .filter(chaptersFilter)
    .forEach(node =>
      createPage(
        composePageOptions(node, { template: "chapter", isPublication: true })
      )
    )

  nodes.filter(bibliographiesFilter).forEach(node =>
    createPage(
      composePageOptions(node, {
        template: "bibliography",
        isPublication: false,
      })
    )
  )

  nodes
    .filter(biogramsFilter)
    .forEach(node =>
      createPage(
        composePageOptions(node, { template: "biogram", isPublication: false })
      )
    )

  nodes
    .filter(hypothesisFilter)
    .forEach(node =>
      createPage(
        composePageOptions(node, { template: "tutorial", isPublication: false })
      )
    )
}

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter @dontInfer {
      title: String!
      author: String
      summary: String
      index: Float
      date: Date
      headerImage: File @fileByRelativePath
      embeddedImagesLocal: [File] @fileByRelativePath
      meta: Boolean
      locale: String
      menus: [MENUS]
    }
    enum MENUS {
      CONTENT
      ILLUSTRATIONS
      FOOTNOTES
      BIBLIOGRAPHY
    }
    `)
}
