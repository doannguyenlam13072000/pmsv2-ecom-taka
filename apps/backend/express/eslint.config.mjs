import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["off"], // Allow console in backend for logging
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["off"], // Allow process.env in backend config
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: "./",
    }],
    "unicorn/filename-case": ["error", {
      case: "camelCase",
      ignore: ["README.md", "TODO.md", "tsconfig.json", "nodemon.json", "package.json"],
    }],
    // Node.js specific rules
    "node/no-missing-import": "off", // TypeScript handles this
    "node/no-unsupported-features/es-syntax": "off", // We're using TypeScript
    "node/no-unpublished-import": "off", // Allow dev dependencies in imports
    "node/no-unpublished-require": "off", // Allow dev dependencies in requires
    "node/no-extraneous-import": "off", // TypeScript handles this
    "node/no-extraneous-require": "off", // TypeScript handles this
    // Express/Node.js specific
    "no-process-exit": "error",
    "node/no-callback-literal": "error",
    "node/no-new-require": "error",
    "node/no-path-concat": "error",
    "node/no-sync": "warn",
    // Additional backend-specific rules
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",
    "prefer-promise-reject-errors": "error",
  },
});
