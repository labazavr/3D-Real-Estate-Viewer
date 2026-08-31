module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'react-refresh'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    ...require('eslint-plugin-react-hooks').configs.recommended.rules,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
};
