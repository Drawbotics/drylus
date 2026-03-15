const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const dotenv = require('dotenv');

const rehypePlayground = require('./utils/rehype-playground');


dotenv.config();


if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is required');
}


const WEBPACK_PORT = process.env.WEBPACK_PORT || 4000;

const isProduction = process.env.NODE_ENV === 'production';


const basePlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
    EXAMPLE_API_HOST: process.env.EXAMPLE_API_HOST || '',
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || '',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html',
    inject: true,
    favicon: './public/favicon.png',
  }),
  new webpack.ProgressPlugin(),
];


const devPlugins = [
  ...basePlugins,
];


const prodPlugins = [
  ...basePlugins,
  new HtmlWebpackPlugin({
    filename: '404.html',
    template: './public/index.html',
    inject: true,
    favicon: './public/favicon.png',
  }),
  {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        fs.cpSync('./dist', '../../docs', { recursive: true });
      });
    },
  },
];


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  stats: 'errors-only',
  entry: './app/index.tsx',
  resolve: {
    symlinks: false,
    modules: [
      path.resolve(__dirname, './app'),
      'node_modules',
    ],
    alias: {
      '~': path.resolve(__dirname, './app'),
      'react': path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react-router': path.resolve(__dirname, 'node_modules/react-router'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      '@remix-run/router': path.resolve(__dirname, '../../node_modules/@remix-run/router'),
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
    minimize: isProduction,
  },
  plugins: isProduction ? prodPlugins : devPlugins,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /use-screen-size\/lib/],
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
        exclude: [/node_modules/, /use-screen-size\/lib/, /react-drylus\/lib/],
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
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: WEBPACK_PORT,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'none',
      overlay: true,
    },
  },
};
