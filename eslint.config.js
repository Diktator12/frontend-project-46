import js from '@eslint/js'
import pkg from 'globals'
import pluginImport from 'eslint-plugin-import'
import pluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const { node, jest } = pkg

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...node,
        ...jest
      },
      parserOptions: {
        sourceType: 'module'
      },
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
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
    },
  },
  {
    files: ['gendiff.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
