const path = require('path');
const webpack = require('webpack');
const betterWebpackProgress = require('better-webpack-progress');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is required');
}


const isProduction = process.env.NODE_ENV === 'production';


const basePlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
  new ProgressPlugin(betterWebpackProgress({
    mode: 'compact',
  })),
  new CopyWebpackPlugin([
    { from: 'src/styles/react-styles.css', to: 'drylus.css' },
  ]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
    _css: JSON.stringify('css'),
  }),
];


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
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
    library: 'drylus',
    libraryTarget: 'umd',
  },
  plugins: isProduction ? basePlugins : [
    ...basePlugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          `Vanilla bundle compiled`,
        ],
      },
    }),
  ],
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
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
};
