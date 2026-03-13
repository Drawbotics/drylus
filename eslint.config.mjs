import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import jestPlugin from 'eslint-plugin-jest';

const sharedRules = {
  'array-callback-return': ['warn'],
  'eqeqeq': ['off', 'always', { null: 'ignore' }],
  'new-parens': ['warn'],
  'no-array-constructor': ['warn'],
  'no-caller': ['warn'],
  'no-cond-assign': ['warn', 'always'],
  'no-eval': ['warn'],
  'no-extend-native': ['warn'],
  'no-extra-bind': ['warn'],
  'no-implied-eval': ['warn'],
  'no-iterator': ['warn'],
  'no-lone-blocks': ['warn'],
  'no-loop-func': ['warn'],
  'no-multi-str': ['warn'],
  'no-global-assign': ['warn'],
  'no-new-wrappers': ['warn'],
  'no-script-url': ['warn'],
  'no-self-compare': ['warn'],
  'no-shadow-restricted-names': ['warn'],
  'no-template-curly-in-string': ['warn'],
  'no-throw-literal': ['warn'],
  'no-useless-computed-key': ['warn'],
  'no-useless-concat': ['warn'],
  'no-useless-rename': ['warn'],
  'no-whitespace-before-property': ['warn'],
};

export default [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      '**/node_modules/**',
      '**/lib/**',
      '**/output/**',
      '**/dist/**',
      '**/docs/**',
      '**/tmp/**',
      'packages/styleguide/Sandbox.tsx',
    ],
  },

  // Base recommended rules for all files
  js.configs.recommended,

  // JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...sharedRules,
      'no-console': ['warn', { allow: ['warn', 'error', 'reportException', 'info'] }],
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-use-before-define': ['warn'],
      'no-useless-constructor': ['warn'],
      'no-unreachable': ['warn'],
      'no-constant-condition': ['warn'],
      'no-case-declarations': ['off'],

      // React
      ...reactPlugin.configs.flat.recommended.rules,
      'react/prop-types': ['off'],
      'react/no-unescaped-entities': ['off'],
      'react/style-prop-object': ['warn'],
      'react/no-children-props': ['off'],
    },
  },

  // TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      jest: jestPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        project: [
          'packages/react-drylus/tsconfig.json',
          'packages/styleguide/tsconfig.json',
          'packages/drylus-style-vars/tsconfig.json',
        ],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.commonjs,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...sharedRules,
      ...jestPlugin.configs['flat/recommended'].rules,
      'no-console': ['warn', { allow: ['warn', 'error', 'reportException'] }],

      // TypeScript overrides
      'no-undef': ['off'],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
      'no-useless-constructor': ['off'],
      '@typescript-eslint/no-useless-constructor': ['warn'],
      'no-use-before-define': ['off'],
      '@typescript-eslint/no-use-before-define': ['warn', { functions: false, variables: false }],

      // React
      ...reactPlugin.configs.flat.recommended.rules,
      'react/prop-types': ['off'],
      'react/no-unescaped-entities': ['off'],
      'react/style-prop-object': ['warn'],
      'react/display-name': ['off'],
      'react/no-children-props': ['off'],
      'react/no-unknown-property': ['error', { ignore: ['mask-type'] }],
    },
  },

  // Icon build scripts — allow console
  {
    files: ['packages/icons/scripts/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
];
