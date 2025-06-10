# ESLint

## Vue 3

### Configuration

#### 1. Install eslint

```bash
pnpm create @eslint/config@latest
```

#### 2. Install plugin @antfu/eslint-config

```bash
pnpm dlx @antfu/eslint-config@latest
```

Reference: <https://github.com/antfu/eslint-config>

#### 3. Update eslint.config.js

- Rename file: `eslint.config.js` to `eslint.config.mjs`
- Replace existing code with:

```mjs
// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

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
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: '.',
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
});
```

#### 4. Update package.json

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

#### 5. Run eslint

- Run this command to find the error

```bash
pnpm lint
```

#### 6. Create .vscode/settings.json to setting auto fix on save

- Create file: `.vscode/settings.json` at root folder
- Add content:

```json
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,
  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    {
      "rule": "style/*",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "format/*",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-indent",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-spacing",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-spaces",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-order",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-dangle",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*-newline",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*quotes",
      "severity": "off",
      "fixable": true
    },
    {
      "rule": "*semi",
      "severity": "off",
      "fixable": true
    }
  ],
  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

#### 7. Add lint:fix

- Add this script to `package.json`

```json
{
  "scripts": {
    "lint:fix": "eslint . --fix"
  }
}
```

- Run this command to fix the error

```bash
pnpm lint:fix
```
