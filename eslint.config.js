import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore build output directory
  { ignores: ["dist"] },
  {
    // Apply to all JS/JSX files
    files: ["**/*.{js,jsx}"],

    // ECMAScript parsing and environment options
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    // ESLint plugins to enhance linting
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    // Rules configuration
    rules: {
      // Start from base recommended rules
      ...js.configs.recommended.rules,

      // Add recommended react-hooks rules
      ...reactHooks.configs.recommended.rules,

      // Warn if non-component values are exported in React Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Disable unused variable warnings
      "no-unused-vars": "off",

      // Disable prop-types rule for React
      "react/prop-types": "off",
    },
  },
];
