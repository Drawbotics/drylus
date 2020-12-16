const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { checkEnv } = require('@drawbotics/check-env');
const betterWebpackProgress = require('better-webpack-progress');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');
const fs = require('fs-extra');
const dotenv = require('dotenv');

const rehypePlayground = require('./utils/rehype-playground');


dotenv.config();


checkEnv([ 'NODE_ENV' ]);


const WEBPACK_PORT = process.env.WEBPACK_PORT || 4000;

const isProduction = process.env.NODE_ENV === 'production';


const basePlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
    EXAMPLE_API_HOST: process.env.EXAMPLE_API_HOST,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html',
    inject: true,
    favicon: './public/favicon.ico',
  }),
  new ProgressPlugin(betterWebpackProgress({
    mode: 'compact',
  })),
];


const devPlugins = [
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
];


const prodPlugins = [
  ...basePlugins,
  new HtmlWebpackPlugin({
    filename: '404.html',
    template: './public/index.html',
    inject: true,
    favicon: './public/favicon.ico',
  }),
  {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        fs.copySync('./dist', '../../docs');
      });
    },
  },
];


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  stats: 'none',
  entry: './app/index.tsx',
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      'node_modules',
    ],
    alias: {
      '~': path.resolve(__dirname, './app'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: [ '.js', '.jsx', '.css', '.mdx', '.ts', '.tsx' ],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: isProduction ? '/drylus/' : '/',
  },
  optimization: {
    namedModules: true,
    minimize: false,
  },
  plugins: isProduction ? prodPlugins : devPlugins,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              compilerOptions: {
                noUnusedLocals: isProduction,
                noUnusedParameters: isProduction,
              },
            },
          },
        ],
      },
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          {
            loader: '@mdx-js/loader',
            options: {
              rehypePlugins: [ rehypePlayground ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
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
  },
};
