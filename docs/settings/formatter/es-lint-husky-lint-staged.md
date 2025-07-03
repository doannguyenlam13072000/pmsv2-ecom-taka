# Formatter with ESLint + Husky + Lint Staged

This document provides a comprehensive guide to setting up a robust code formatting and linting workflow using ESLint, Husky, and Lint Staged.

## Table of Contents

1. [ESLint Configuration](#eslint-configuration)
2. [Husky Setup](#husky-setup)
3. [Lint Staged Integration](#lint-staged-integration)

## ESLint Configuration

### 1. Install eslint

- At specific app folder, run this command:

```bash
pnpm create @eslint/config@latest
```

### 2. Install plugin @antfu/eslint-config

- At specific app folder, run this command:

```bash
pnpm dlx @antfu/eslint-config@latest
```

Reference: [@antfu/eslint-config](https://github.com/antfu/eslint-config)

### 3. Update eslint.config.js

- Rename file: `eslint.config.js` to `eslint.config.mjs`
- Replace existing code with:

```mjs
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

### 4. Update package.json

- At specific app folder, add this to `package.json`

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

### 5. Run eslint

- At specific app folder, run this command to find the error

```bash
pnpm lint
```

### 6. Create .vscode/settings.json to setting auto fix on save

- At root folder, create file: `.vscode/settings.json`
- This config will be used by all apps
  - It will disable the default formatter, use eslint instead
  - It will auto fix the error on save
- Add script to `settings.json`:

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],
  "eslint.validate": [
    "javascript", "javascriptreact", "typescript", "typescriptreact",
    "vue", "html", "markdown", "json", "jsonc", "yaml", "toml",
    "xml", "gql", "graphql", "astro", "svelte", "css", "less",
    "scss", "pcss", "postcss"
  ]
}
```

### 7. Add lint:fix to turbo (Optional)

- Add this to `turbo.json`

```json
{
  "tasks": {
    "lint:fix": {
      "outputs": []
    }
  }
}
```

### 8. Add lint:fix to package.json (Optional)

- At root folder, add this to `package.json`

```json
{
  "scripts": {
    "lint:fix": "turbo run lint:fix"
  }
}
```

### 9. Add lint:fix without turbo (Alternative)

- If you're not using turbo or want a direct approach, add this to `package.json` at the specific app folder:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

- Or if you want to lint specific file types:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --ext .js,.ts,.vue,.astro --fix"
  }
}
```

- For root package.json (if managing multiple apps without turbo):

```json
{
  "scripts": {
    "lint:fix": "pnpm --recursive exec eslint . --fix"
  }
}
```

## Husky Setup

### 1. Install husky

- Add root folder `pnpm add -D husky`
- Initialize husky `pnpm exec husky init`

## Lint Staged Integration

### 1. Install lint-staged

```bash
pnpm add -D lint-staged
```

### 2. Add lint-staged to package.json

- Add this to `package.json` for specific app

```json
{
  "lint-staged": {
    "apps/frontend/vue/**/*": "pnpm --filter vue-app lint"
  }
}
```

- Explain:
  - `apps/frontend/vue/**/*`: This is the path to the files that will be linted
  - `pnpm --filter vue-app lint`: This is the command that will be run to lint the files

### 3. Add lint-staged to pre-commit

- Add this script to `pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec lint-staged
```

### 4. Test pre-commit

- Test lint-staged
  - It will run the lint-staged command
  - It will lint the files in the `apps/frontend/vue` folder

```bash
pnpm exec lint-staged
```

- Test pre-commit
  - It will run the pre-commit script
  - It will run the lint-staged command

- Steps:
  - Add a file `test.js` to the `apps/frontend/vue` folder
  - Make a change to the file with some error
  - Run `git add apps/frontend/vue/test.js`
  - Run `git commit -m "test"`
    - It will run the pre-commit script
    - It will run the lint-staged command
    - Let's check the error
