module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    indent: [
      'error',
      2,
      { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] },
    ], // 2 spaces for indentation
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ], // Config for alphabetizing modules
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
