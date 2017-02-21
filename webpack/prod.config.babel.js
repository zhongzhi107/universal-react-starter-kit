import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './webpack-isomorphic-tools';
import {
  commonChunks,
  paths,
  fileHashLength,
  jsOutputDirectory,
  cssOutputDirectory,
  offlinePageTemplate,
  offlinePageFileName
} from '../src/config/compiler';

const { dist } = paths;
const context = path.resolve(__dirname, '..');
const assetsPath = path.resolve(context, dist);

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig);

const entry = {
  main: [
    './src/client.js'
  ]
};

const output = {
  path: assetsPath,
  filename: `${jsOutputDirectory}/[name]-[chunkhash:${fileHashLength}].js`,
  chunkFilename: `${jsOutputDirectory}/[name]-[chunkhash:${fileHashLength}].js`,
  publicPath: ''
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
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 2,
              minimize: true,
              localIdentName: '[local]___[hash:base64:5]',
            }
          },
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
  new CleanPlugin([assetsPath], { root: context }),

  // css files from the extract-text-plugin loader
  new ExtractTextPlugin({
    filename: `${cssOutputDirectory}/[name]-[contenthash:${fileHashLength}].css`,
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
  // new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

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

  isomorphicToolsPlugin,

  new CopyWebpackPlugin([
    {
      from: './static'
    }
  ], { ignore: ['*.psd'] }),

  new HtmlWebpackPlugin({
    filename: offlinePageFileName,
    template: offlinePageTemplate
  }),

  new OfflinePlugin({
    // caches: {
    //   main: [
    //     // These assets don't have a chunk hash.
    //     // SW fetch them on every SW update.
    //     // '/',
    //     offlinePageFileName
    //   ],
    //   additional: [
    //     // All other assets have a chunk hash.
    //     // SW only fetch them once.
    //     // They'll have another name on change.
    //     ':rest:',
    //     // ':externals:'
    //   ]
    // },
    // externals: [
    //   'manifest.json',
    //   'robots.txt',
    //   'favicon.ico',
    //   'images/touch/logo_192.png'
    // ],
    // // To remove a warning about additional need to have hash
    // // safeToUseOptionalCaches: true,
    // // 'additional' section is fetch only once.
    // // updateStrategy: 'changed',
    // // When using the publicPath we need to disable the "relativePaths"
    // // feature of this plugin.
    // relativePaths: false,
  })
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
