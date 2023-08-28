module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["react-app"],
  rules: {
    "no-use-before-define": "off", // incompatible with import of React
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "template-curly-spacing": "off",
        indent: "off",
        semi: "error",
        "no-extra-semi": "error",
        "no-console": "warn",
        "no-shadow": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { vars: "all", args: "none", ignoreRestSiblings: true, argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
      },
    },
  ],
};
