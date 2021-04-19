const config = {
  presets: [
    "@babel/env",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    // "react-hot-loader/babel",
    ["import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }]
  ]
};

const configTest = {
  presets: [
    "@babel/env",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};

module.exports = process.env.NODE_ENV === 'test' ? configTest : config;
