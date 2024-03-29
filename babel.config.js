module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      'useBuiltIns': 'usage',
      'modules': false,
      'corejs': '2',
    }],
    ['@babel/preset-react'],
  ];

  const babelrcRoots = [
    '.',
    'packages/*',
  ];

  const plugins = [
    'react-hot-loader/babel',
    ['babel-plugin-emotion', {
      sourceMap: false,
      autoLabel: true,
      labelFormat: '[filename]__[local]',
    }],
    'babel-plugin-codegen',
    'babel-plugin-react-docgen',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ];

  const env = {
    test: {
      presets,
      plugins: [
        ...plugins,
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  };

  return {
    presets,
    plugins,
    babelrcRoots,
    sourceType: 'unambiguous',
    env,
  };
}
