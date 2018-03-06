module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true
  },
  plugins: [
    "flowtype"
  ],
  rules: {
    "react/prop-types": 0,
    "no-implicit-coercion": 0,
    "max-len": 0
  }
};
