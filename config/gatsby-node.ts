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
  return !node.slug.includes("bibliography")
}

function bibliographyFilter(node: Node) {
  return node.slug.includes("bibliography")
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

  data?.allMdx.nodes.filter(chaptersFilter).forEach(node => {
    const slug = delocalizeSlug(node.slug)

    createPage({
      path: slug.replace("index", ""),
      component: path.resolve("./src/templates/chapter.tsx"),
      context: {
        slugs: localizeSlug(slug),
        publication: true,
      },
    })
  })

  data?.allMdx.nodes.filter(bibliographyFilter).forEach(node => {
    const slug = delocalizeSlug(node.slug)

    createPage({
      path: slug.replace("index", ""),
      component: path.resolve("./src/templates/bibliography.tsx"),
      context: {
        slugs: localizeSlug(slug),
        publication: false,
      },
    })
  })
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
    }
    `)
}
