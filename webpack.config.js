const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack_mode = process.env.npm_lifecycle_event; // thius pulls either 'dev' or 'build'
console.log("🚀 ~ file: webpack.config.js ~ webpack_mode", webpack_mode);

const config = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle[hash].js",
  },
  devtool: "eval-cheap-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css$)/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
  ],
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
  },
};

if (webpack_mode === "build") {
  config.mode = "production";
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "main.[hash].css",
    }),
    new CleanWebpackPlugin()
  );
}

module.exports = config;
