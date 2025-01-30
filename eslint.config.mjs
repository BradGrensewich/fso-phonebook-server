import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "error",
      eqeqeq: "error",
      "no-console": "off",
    },
  },
  {
    ignores: ["dist/**"],
  },
];
