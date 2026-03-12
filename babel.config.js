module.exports = function(api) {
  const isTest = process.env.NODE_ENV === 'test';

  api.cache(() => isTest);

  const presets = [
    ['@babel/preset-env', {
      'useBuiltIns': 'usage',
      'modules': false,
      'corejs': '2',
    }],
    ['@babel/preset-react'],
    ...(isTest ? [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]] : []),
  ];

  const babelrcRoots = [
    '.',
    'packages/*',
  ];

  const plugins = [
    ...(isTest ? [] : ['react-hot-loader/babel']),
    ...(isTest ? [] : [['babel-plugin-emotion', {
      sourceMap: false,
      autoLabel: true,
      labelFormat: '[filename]__[local]',
    }]]),
    ...(isTest ? [] : ['babel-plugin-codegen']),
    ...(isTest ? [] : ['babel-plugin-react-docgen']),
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-transform-nullish-coalescing-operator',
    ...(isTest ? ['@babel/plugin-transform-modules-commonjs'] : []),
  ];

  return {
    presets,
    plugins,
    babelrcRoots,
    sourceType: 'unambiguous',
  };
}
