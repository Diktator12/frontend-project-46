import js from '@eslint/js'
import globals from 'globals'
import pluginImport from 'eslint-plugin-import'
import pluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import stylistic from '@stylistic/eslint-plugin'

const { node, jest } = globals

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  stylistic.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...node,
        ...jest,
      },
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
      stylistic,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.js',
            'eslint.config.js',
          ],
        },
      ],

      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      ...prettierConfig.rules,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-extra-semi': 'error',

      '@stylistic/arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-trailing-spaces': 'error',
    },
  },
  {
    files: ['gendiff.js', 'eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
