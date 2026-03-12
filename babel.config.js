module.exports = function(api) {
  const isTest = process.env.NODE_ENV === 'test';

  api.cache(() => isTest);

  const presets = [
    ['@babel/preset-env', {
      'useBuiltIns': 'usage',
      'modules': false,
      'corejs': '3',
    }],
    ['@babel/preset-react', { runtime: 'classic' }],
    ...(isTest ? [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]] : []),
  ];

  const babelrcRoots = [
    '.',
    'packages/*',
  ];

  const plugins = [
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
