const path = require('path');
const webpack = require('webpack');
const checkEnv = require('@drawbotics/check-env');
const betterWebpackProgress = require('better-webpack-progress');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');


const WEBPACK_PORT = 4000;


checkEnv([ 'NODE_ENV' ]);


const isProduction = process.env.NODE_ENV === 'production';


const basePlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './app/index.html',
    inject: true,
  }),
  new ProgressPlugin(betterWebpackProgress({
    mode: 'compact',
  })),
];


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  stats: 'none',
  entry: './app/index.js',
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      'node_modules',
    ],
    extensions: [ '.js', '.jsx', '.css', '.mdx' ],
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'bundle.js',
  },
  optimization: {
    namedModules: true,
    minimize: false,
  },
  plugins: isProduction ? basePlugins : [
    ...basePlugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          `The styleguide is running at http://localhost:${WEBPACK_PORT}`,
          `The styleguide is running at http://${ip.address()}:${WEBPACK_PORT}`
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.mdx$/,
        use: [{
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          '@mdx-js/loader',
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: WEBPACK_PORT,
    inline: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    quiet: true,
    stats: true,
    noInfo: false,
    clientLogLevel: 'none',
    overlay: true,
    contentBase: [path.join(__dirname, '/dist'), path.join(__dirname, 'node_modules')],
  },
};
