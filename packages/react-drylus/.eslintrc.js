module.exports = {
  extends: '../../.eslintrc.ts.js',
  plugins: ['@drawbotics/eslint-plugin-deprecated-props'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@drawbotics/deprecated-props/deprecated-props': ['warn'],
  },
};