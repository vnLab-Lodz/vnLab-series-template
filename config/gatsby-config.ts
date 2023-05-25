import config from "../publication/publication.config.json"
import { getPublicationMetadata } from "./util"
import { GatsbyConfig } from "gatsby"
const visit = require(`unist-util-visit`)

const metadata = getPublicationMetadata()

export default {
  siteMetadata: { siteUrl: config.siteUrl },
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
      options: { name: `images`, path: `${__dirname}/../src/images` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `publication`, path: `${__dirname}/../publication` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `meta`, path: `${__dirname}/../meta` },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: metadata.default.code,
        configPath: require.resolve(`../i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./i18n/locale`,
        i18nextOptions: {
          ns: ["common", "404", "home", "nav-menu", "search", "fullscreen"],
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
        name: metadata.default.title,
        short_name: metadata.default.title,
        description: metadata.default.description,
        start_url: metadata.default.startUrl,
        lang: metadata.default.code,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        orientation: `portrait`,
        icon: `${__dirname}/../static/images/favicon3.png`,
        cache_busting_mode: `none`,
        localize: metadata.localized.map(meta => ({
          start_url: meta.startUrl,
          lang: meta.code,
          name: meta.title,
          short_name: meta.title,
          description: meta.description,
        })),
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: config.languages.map(lang => `${lang.startUrl}*`),
        workboxConfig: {
          globPatterns: [
            `**\/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2,ttf,eot}`,
            `**/images/*`,
            `**/icons/*`,
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-multi-language-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => config.siteUrl,
        //@ts-ignore
        resolvePages: ({ allSitePage: { nodes: allPages } }) => allPages,
        //@ts-ignore
        serialize: ({ path, context }) => ({
          url: path,
          lastmod: new Date().toLocaleDateString("sv"),
        }),
        langs: config.languages.map(lang => lang.code),
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: config.siteUrl,
        env: {
          development: { policy: [{ userAgent: "*", disallow: ["/"] }] },
          production: { policy: [{ userAgent: "*", allow: "/" }] },
        },
      },
    },
  ],
} as GatsbyConfig
