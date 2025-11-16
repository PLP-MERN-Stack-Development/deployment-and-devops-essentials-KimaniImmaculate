import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      // include both browser and node globals
      globals: { ...globals.browser, ...globals.node }
    },
    env: {
      node: true,
      es2021: true
    },
    rules: {
      // allow unused function args when they start with an underscore (e.g. _next)
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } }
]);
