const webpack = require("webpack");
const { merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    publicPath: "/",
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/image": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
