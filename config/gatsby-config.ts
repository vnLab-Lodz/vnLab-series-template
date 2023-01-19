import { GatsbyConfig } from "gatsby"
const visit = require(`unist-util-visit`)

export default {
  siteMetadata: {
    title: `The Archive as Project`,
    description: `This project is an attempt at rethinking the archive in a post-socialist Central and Eastern Europe that is still facing the need to work though its 20th century past.`,
    author: `@vnLab1`,
    siteUrl: `http://vnlab.filmschool.lodz.pl/`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 90,
          formats: ["auto", "webp"],
          placeholder: "blurred",
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/../src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `publication`,
        path: `${__dirname}/../publication`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `meta`,
        path: `${__dirname}/../meta`,
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`../i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./i18n/locale`,
        i18nextOptions: {
          ns: ["common", "404", "home", "nav-menu", "search"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `remark-vnlab-plugin`,
          {
            resolve: `gatsby-remark-orphans`,
            options: {
              silenceReporting: true,
              disableDefaultLocaleResolver: true,
              customLocaleResolver: (markdownNode: any) => {
                const parts = markdownNode.fileAbsolutePath.split(".")
                const fileLocale = parts[parts.length - 2]
                const { fields, frontmatter } = markdownNode
                return fields?.locale ?? frontmatter?.locale ?? fileLocale
              },
            },
          },
        ],
        rehypePlugins: [
          function rehypeAddIdToParagraphs() {
            return function transformParagraphs(tree: any) {
              visit(tree, { type: "element", tagName: "p" }, (node: any) => {
                node.properties = {
                  ...node.properties,
                  id: `paragraph__${node.position.start.line}`,
                }
              })
            }
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: [`HK-Grotesk:n3,n4,n5,n7`],
          urls: [`/fonts/fonts.css`],
        },
        google: {
          families: [`Crimson Pro:300,400,500,600,700,800,900&display=swap`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Archive as project`,
        short_name: `Archive as project`,
        description: `This project is an attempt at rethinking the archive in a post-socialist Central and Eastern Europe that is still facing the need to work though its 20th century past.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        orientation: `portrait`,
        icon: `${__dirname}/../static/images/favicon3.png`,
        cache_busting_mode: `none`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`, `/pl/*`],
        workboxConfig: {
          globPatterns: [
            `**\/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2,ttf,eot}`,
            `**/images/*`,
            `**/icons/*`,
          ],
        },
      },
    },
  ],
} as GatsbyConfig
