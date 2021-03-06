const webpack = require("webpack")

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on "fs" module
    // https://github.com/zeit/next.js/issues/7755
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    // Fixes code that depend on "jquery" module
    // https://github.com/zeit/next.js/issues/1465
    config.plugins.push(
      new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
      })
    )
    // Allows code to import qraphql files
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    // whttps://github.com/apollographql/graphql-tag#webpack-loading-and-preprocessing    
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })
    return config
  }
}
