const path = require('path');
const webpack = require('webpack');
const checkEnv = require('@drawbotics/check-env');
const betterWebpackProgress = require('better-webpack-progress');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');
const fs = require('fs-extra');

const rehypePlayground = require('./utils/rehype-playground');


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
  {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        fs.copySync('./dist/index.html', './dist/404.html');
        fs.copySync('./dist', '../../docs');
      });
    },
  },
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
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
    extensions: [ '.js', '.jsx', '.css', '.mdx' ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
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
          }, {
            loader: '@mdx-js/loader',
            options: {
              rehypePlugins: [ rehypePlayground ],
            },
          },
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
