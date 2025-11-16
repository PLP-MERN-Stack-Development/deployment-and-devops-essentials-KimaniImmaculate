import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      // include both browser and node globals
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: { js },
    rules: {
      // include the recommended rules from @eslint/js, then override/add custom rules
      ...js.configs.recommended.rules,

      // allow unused function args when they start with an underscore (e.g. _next)
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },

  // Treat .js files as ESM modules
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module"
    }
  }
];
