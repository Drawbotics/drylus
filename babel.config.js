module.exports = function(api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "modules": false,
      "corejs": "2",
    }],
    ["@babel/preset-react"],
  ];

  const babelrcRoots = [
    ".",
    "packages/*",
  ];

  const plugins = [
    ["babel-plugin-emotion", {
      sourceMap: true,
      autoLabel: true,
      labelFormat: '[filename]__[local]',
    }],
    "babel-plugin-codegen",
    "@babel/plugin-proposal-export-default-from",
    ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
    "@babel/plugin-proposal-do-expressions",
  ];

  return {
    presets,
    plugins,
    babelrcRoots,
    sourceType: 'unambiguous',
  };
}
