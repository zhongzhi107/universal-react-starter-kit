import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import autoprefixer from 'autoprefixer';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from 'config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

console.log('[npm build]process.env.NODE_ENV: ', process.env.NODE_ENV);

const {
  appConfig: {
    paths: {
      dist
    },
    globals: {
      __DISABLE_SOCKET__
    },
  },
  buildConfig: {
    assetTypes,
    commonChunks,
    fileHashLength,
    jsOutputDirectory,
    cssOutputDirectory,
    imageOutputDirectory
  }
} = config;
const copyAssetTypes = assetTypes.concat('json', 'txt');
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
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ]
      })
    },
    {
      test: isomorphicToolsPlugin.regular_expression('images'),
      use: [
        {
          loader: 'url-loader',
          query: {
            name: `${imageOutputDirectory}/[name]-[hash:${fileHashLength}].[ext]`,
            limit: 10240
          }
        }
      ]
    }
  ]
};

const plugins = [
  // You can configure global / shared loader options with this plugin
  // and all loaders will receive these options.
  // In the future this plugin may be removed.
  // @see https://webpack.js.org/plugins/loader-options-plugin
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer]
    }
  }),

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
    __DISABLE_SOCKET__,
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

  isomorphicToolsPlugin,

  // Copy files and directories in webpack
  // @see https://github.com/kevlened/copy-webpack-plugin
  new CopyWebpackPlugin([
    {
      from: {
        glob: `**/*.{${copyAssetTypes.join(',')}}`
      },
      context: 'static'
    }
  ])
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
  devtool: 'source-map',
  context,
  entry,
  output,
  module: moduleConfig,
  resolve,
  plugins
};

export default webpackConfig;
