const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is required');
}


const isProduction = process.env.NODE_ENV === 'production';


const basePlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
  new webpack.ProgressPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'src/styles/react-styles.css', to: 'drylus.css' },
    ],
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
    _css: JSON.stringify('css'),
  }),
];


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  stats: 'none',
  entry: './src/index.js',
  resolve: {
    extensions: [ '.js', '.css' ],
    alias: {
      'emotion': require.resolve('emotion'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'drylus.js',
    library: {
      name: 'drylus',
      type: 'umd',
    },
  },
  plugins: basePlugins,
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
            plugins: [
              'babel-plugin-emotion',
            ],
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
};
