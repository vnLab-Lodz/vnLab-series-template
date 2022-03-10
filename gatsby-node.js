const {
  createPages,
  createSchemaCustomization,
  onCreateWebpackConfig,
} = require("./config/gatsby-node")

exports.createPages = createPages
exports.createSchemaCustomization = createSchemaCustomization
exports.onCreateWebpackConfig = onCreateWebpackConfig
