import { GatsbyConfig } from "gatsby"

export default {
  siteMetadata: {
    title: `Publication-as-a-Website i18n Starter`,
    description: `Kick off your next PaaW project with this basic starter.`,
    author: `@vnLab1`,
    siteUrl: `http://vnlab.filmschool.lodz.pl/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 90,
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              disableBgImageOnAlpha: true,
            },
          },
        ],
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
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: [`HK-Grotesk:n3,n4,n5,n7`],
          urls: [`/fonts/fonts.css`],
        },
        google: {
          families: [`Crimson Pro:300,400,500,600,700,800,900`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Default vnLab Publication-as-a-Website starter`,
        short_name: `vnLab starter`,
        description: `A simple starter for PaaW projects.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        orientation: `portrait`,
        icon: `${__dirname}/../static/images/favicon-512x512.png`,
        icons: [
          {
            src: "/images/favicon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          // maskable
          {
            purpose: "maskable",
            src: "/images/maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            purpose: "maskable",
            src: "/images/maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        cache_busting_mode: `none`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
        workboxConfig: {
          globPatterns: [`**/images/*`],
        },
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
  ],
} as GatsbyConfig
