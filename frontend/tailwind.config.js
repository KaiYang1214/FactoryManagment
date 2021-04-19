const { colors } = require("tailwindcss/defaultTheme");
// const theme = require('./theme')
const margins = require("./margins");

module.exports = {
  important: true,
  layers: ["components", "utilities"],
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/index.html"],
  theme: {
    textColor: colors,
    borderColor: colors,
    backgroundColor: colors,
    spacing: margins.reduce(
      (obj, s) => Object.assign(obj, { [s]: `${s}px` }),
      {}
    ),
  },
  variants: {},
  plugins: [],
};
