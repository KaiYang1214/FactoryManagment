/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const modifyVars = require("./src/theme/theme.json");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const gitRevisionPlugin = new GitRevisionPlugin({
  branchCommand: 'rev-parse --symbolic-full-name HEAD',
  versionCommand: 'describe --tags --abbrev=0 || echo "no tag found"',
  branch: true,
});

module.exports = (env, options) => {
  const plugins = [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "./index.html"
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-tw|zh-cn/),
    new Dotenv({ systemvars: true }),
    new GitRevisionPlugin({ commithashCommand: "rev-parse --short HEAD" }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    }),
    // new CompressionPlugin(),
  ];

  if (options.mode === 'development') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      filename: "[name].[git-revision-hash].js"
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            emitError: true,
            quiet: true,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
          ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader",
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true,
                modifyVars
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        },
        {
          test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
          loader: "file-loader",
          options: {
            esModule: false
          }
        }
      ]
    },
    resolve: {
      alias: {
        // "@ant-design/icons/lib/dist$": path.resolve(
        //   __dirname,
        //   "src/static/icons/index.js"
        // ),
        "@": path.resolve(__dirname, "src/"),
      },
      extensions: [".js", ".jsx"],
      modules: [
        path.resolve(__dirname, "src/"),
        path.resolve(__dirname, "node_modules/")
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins,
    devServer: {
      proxy: [{
        context: ['/azure', '/api', '/admin'],
        target: 'http://localhost:3000',
      }]
    },
    devtool: 'cheap-module-source-map'
  }
};
