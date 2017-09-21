/* eslint import/first: 0 */
import '../dotenv';
import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DelayCopyWebpackPlugin from 'delay-copy-webpack-plugin';
import ReplaceHashWebpackPlugin from 'replace-hash-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from '../src/config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

console.log('[npm build]process.env.NODE_ENV: ', process.env.NODE_ENV);

const {
  appConfig: {
    paths: {
      dist
    },
  },
  buildConfig: {
    // assetTypes,
    commonChunks,
    fileHashLength,
    jsOutputDirectory,
    cssOutputDirectory,
    imageOutputDirectory,
    fontOutputDirectory,
    dataUrlLimit
  }
} = config;
// const copyAssetTypes = assetTypes.concat('json', 'txt');
const context = path.resolve(__dirname, '..');
const assetsPath = path.resolve(context, dist);

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig);

const entry = {
  main: [
    './src/client.js'
  ]
};

const { CDN_ROOT = '' } = process.env;

console.log('[npm build] CDN_ROOT: ', CDN_ROOT);

const output = {
  path: assetsPath,
  filename: `${jsOutputDirectory}/[name]-[chunkhash:${fileHashLength}].js`,
  chunkFilename: `${jsOutputDirectory}/[name]-[chunkhash:${fileHashLength}].js`,
  publicPath: CDN_ROOT
};

const resolve = {
  modules: ['src', 'node_modules']
};

const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // importLoaders: 2,
              minimize: true,
              localIdentName: '[local]_[hash:base64:4]'
            }
          },
          { loader: 'postcss-loader' }
        ]
      })
    },
    {
      test: /manifest.json$/,
      loader: 'file-loader',
      options: {
        name: `[name]-[hash:${fileHashLength}].[ext]`
      }
    },
    {
      test: isomorphicToolsPlugin.regular_expression('images'),
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true
          }
        },
        {
          loader: 'url-loader',
          options: {
            name: `${imageOutputDirectory}/[name]-[hash:${fileHashLength}].[ext]`,
            limit: dataUrlLimit
          }
        }
      ]
    },
    {
      test: isomorphicToolsPlugin.regular_expression('fonts'),
      loader: 'file-loader',
      options: {
        name: `${fontOutputDirectory}/[name]-[hash:${fileHashLength}].[ext]`,
        limit: dataUrlLimit
      }
    }

  ]
};

const plugins = [
  // Remove/clean your build folder(s) before building
  // @see https://github.com/johnagan/clean-webpack-plugin
  new CleanPlugin([assetsPath], { root: context }),

  // Extract text from bundle into a file
  // css files from the extract-text-plugin loader
  // @see https://github.com/webpack-contrib/extract-text-webpack-plugin
  new ExtractTextPlugin({
    filename: `${cssOutputDirectory}/[name]-[contenthash:${fileHashLength}].css`,
    allChunks: true
  }),

  // The DefinePlugin allows you to create global constants
  // which can be configured at compile time.
  // @see https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false
  }),

  // The EnvironmentPlugin is a shorthand for using the DefinePlugin
  // on process.env keys
  // @see https://webpack.js.org/plugins/environment-plugin/
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production'
  }),

  // optimizations
  new webpack.optimize.OccurrenceOrderPlugin(),

  // UglifyJS
  // @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    },
    comments: /^!/
  }),

  new CopyWebpackPlugin([{
    from: {
      glob: '**/*',
      dot: true
    },
    to: 'server'
  }], {
    ignore: [
      '.git/**',
      '.tmp/**',
      'api/**',
      'docs/**',
      'logs/**',
      'node_modules/**',
      'profiles/**',
      'static/**',
      'tools/**',
      'webpack/**',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc.js',
      '.gitignore',
      '.stylelintrc.js',
      '*.md',
      'appveyor.yml',
      'pom.xml'
    ]
  }),

  new DelayCopyWebpackPlugin({
    from: 'webpack-assets.json',
    to: 'prd/server',
    interval: 2000
  }),

  isomorphicToolsPlugin,

  new ReplaceHashWebpackPlugin({
    cwd: dist,
    src: 'manifest*.json',
    dest: dist,
    exts: ['png']
  })
];

if (process.env.NODE_ENV !== 'local') {
  plugins.push(
    // Offline plugin (ServiceWorker, AppCache) for webpack
    // @see https://github.com/NekR/offline-plugin
    new OfflinePlugin({
      caches: {
        main: [
          // These assets don't have a chunk hash.
          // SW fetch them on every SW update.
          // './',
          ':rest:'
        ],
        additional: [':externals:']
      },
      externals: ['./'],
      safeToUseOptionalCaches: true
    })
  );
}

// Creates a separate file (known as a chunk),
// consisting of common modules shared between multiple entry points
// @see https://webpack.js.org/plugins/commons-chunk-plugin
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
  devtool: false,
  context,
  entry,
  output,
  module: moduleConfig,
  resolve,
  plugins
};

export default webpackConfig;
