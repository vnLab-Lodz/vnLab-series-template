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

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions

  const { data, errors } = await graphql<Data>(`
    query {
      allMdx {
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

  data?.allMdx.nodes.forEach(node => {
    const slug = delocalizeSlug(node.slug)

    createPage({
      path: slug.replace("index", ""),
      component: path.resolve("./src/templates/section.tsx"),
      context: {
        slugs: localizeSlug(slug),
        publication: true,
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
    }
    `)
}
