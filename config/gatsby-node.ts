import {
  CreatePagesArgs,
  CreateSchemaCustomizationArgs,
  CreateWebpackConfigArgs,
} from "gatsby"
import { delocalizeSlug, localizeSlug } from "../src/util"

const path = require(`path`)

interface Node {
  id: string
  slug: string
  frontmatter: {
    title: string
    date: string
    slideshow: boolean
  }
}

interface Data {
  allMdx: {
    nodes: Node[]
  }
}

function chaptersFilter(node: Node) {
  const {
    slug,
    frontmatter: { slideshow },
  } = node

  return (
    !slug.includes("bibliography") &&
    !slug.includes("biograms") &&
    !slug.includes("hypothesis_tutorial") &&
    !slideshow
  )
}

function bibliographiesFilter(node: Node) {
  return node.slug.includes("bibliography")
}

function biogramsFilter(node: Node) {
  return node.slug.includes("biograms")
}

function slideshowFilter(node: Node) {
  return !!node.frontmatter.slideshow
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
            slideshow
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

  nodes
    .filter(slideshowFilter)
    .forEach(node =>
      createPage(
        composePageOptions(node, { template: "slides", isPublication: true })
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
      meta_type: String
      locale: String
      menus: [MENUS]
      slideshow: Boolean
    }
    enum MENUS {
      CONTENT
      ILLUSTRATIONS
      FOOTNOTES
      BIBLIOGRAPHY
    }
    type SitePage implements Node {
      context: SitePageContext
    }
    type SitePageContext {
        slugs: [String]
        locale: String
        publication: Boolean
    }
    `)
}

export const onCreateWebpackConfig = ({
  stage,
  loaders,
  actions,
}: CreateWebpackConfigArgs) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /reveal.js/,
            use: loaders.null(),
          },
          {
            test: /screenfull/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
