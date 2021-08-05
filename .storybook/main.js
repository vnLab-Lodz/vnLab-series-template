module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async config => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    config.module.rules[0].use[0].options.plugins = [
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]
    return config
  },
}
