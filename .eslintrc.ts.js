module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'deprecated-props', 'jest'],
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  parserOptions: {
    sourceType: 'module',
    project: ['packages/react-drylus/tsconfig.json', 'packages/styleguide/tsconfig.json', 'packages/drylus-style-vars/tsconfig.json'],
  },
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },
  rules: {
    // General
    'array-callback-return': ['warn'],
    eqeqeq: ['off', 'always', { null: 'ignore' }],
    'new-parens': ['warn'],
    'no-array-constructor': ['warn'],
    'no-caller': ['warn'],
    'no-cond-assign': ['warn', 'always'],
    'no-console': ['warn', { allow: ['warn', 'error', 'reportException'] }],
    'no-eval': ['warn'],
    'no-extend-native': ['warn'],
    'no-extra-bind': ['warn'],
    'no-implied-eval': ['warn'],
    'no-iterator': ['warn'],
    'no-lone-blocks': ['warn'],
    'no-loop-func': ['warn'],
    'no-multi-str': ['warn'],
    'no-native-reassign': ['warn'],
    'no-new-wrappers': ['warn'],
    'no-script-url': ['warn'],
    'no-self-compare': ['warn'],
    'no-shadow-restricted-names': ['warn'],
    'no-template-curly-in-string': ['warn'],
    'no-throw-literal': ['warn'],
    'no-use-before-define': ['warn'],
    'no-useless-computed-key': ['warn'],
    'no-useless-concat': ['warn'],
    'no-useless-rename': ['warn'],
    'no-whitespace-before-property': ['warn'],

    // TypeScript
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-useless-constructor': ['off'],
    '@typescript-eslint/no-useless-constructor': ['warn'],

    // React
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/style-prop-object': ['warn'],
    'react/display-name': ['off'],
    'react/no-children-props': ['off'],

    // Deprecation
    'deprecated-props/deprecated-props': ['warn'],
  },
};
