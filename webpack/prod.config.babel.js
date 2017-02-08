import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import autoprefixer from 'autoprefixer';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import {compiler} from '../src/config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

const {commonChunks} = compiler;
const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig);

const entry = {
  main: [
    './src/client.js'
  ]
};

const context = path.resolve(__dirname, '..');

const output = {
  path: assetsPath,
  filename: '[name]-[chunkhash].js',
  chunkFilename: '[name]-[chunkhash].js',
  publicPath: '/dist/'
};

const resolve = {
  modules: ['src', 'node_modules'],
};

const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          { loader: 'css-loader', query: { importLoaders: 2, minimize: true } },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      }),
    },
    {
      test: isomorphicToolsPlugin.regular_expression('images'),
      use: [
        {
          loader: 'url-loader',
          query: {
            limit: 10240,
          }
        },
        {
          loader: 'image-webpack-loader',
          query: {
            bypassOnDebug: true,
          },
        },
      ]
    }
  ]
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer],
    },
  }),
  new CleanPlugin([assetsPath], { root: projectRootPath }),

  // css files from the extract-text-plugin loader
  new ExtractTextPlugin({
    filename: '[name]-[chunkhash].css',
    allChunks: true,
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    },

    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false
  }),

  // ignore dev config
  new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

  // optimizations
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
    },
    comments: /^!/,
  }),

  new OfflinePlugin(),

  isomorphicToolsPlugin
];

if (commonChunks) {
  const chunkKeys = Object.keys(commonChunks);
  chunkKeys.forEach((key) => {
    entry[key] = commonChunks[key];
  });

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({ names: chunkKeys }),
  );
}

const webpackConfig = {
  devtool: 'source-map',
  context,
  entry,
  output,
  module: moduleConfig,
  resolve,
  plugins
};

export default webpackConfig;
