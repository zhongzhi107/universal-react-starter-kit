import path from 'path';
import { existsSync } from 'fs';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from 'config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

console.log('[npm serve]process.env.NODE_ENV: ', process.env.NODE_ENV);

const {
  appConfig: {
    host,
    port,
    paths: {
      tmp
    },
    globals: {
      __DISABLE_SOCKET__
    }
  },
  buildConfig: {
    commonChunks,
    jsOutputDirectory
  }
} = config;
const context = path.resolve(__dirname, '..');
const dll = path.resolve(context, tmp);
const devPort = parseInt(port, 10) + 1;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig);


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

  // Style lint
  new StyleLintPlugin({
    files: '**/*.less',
    syntax: 'less',
    // Disable style lint error terminating here
    failOnError: false
  }),

  // hot reload
  new webpack.HotModuleReplacementPlugin(),

  // new webpack.IgnorePlugin(/webpack-stats\.json$/),

  // The DefinePlugin allows you to create global constants
  // which can be configured at compile time.
  // @see https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DISABLE_SOCKET__,
    // DISABLE redux-devtools HERE
    __DEVTOOLS__: true
  }),

  // The EnvironmentPlugin is a shorthand for using the DefinePlugin
  // on process.env keys
  // @see https://webpack.js.org/plugins/environment-plugin/
  new webpack.EnvironmentPlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }),

  isomorphicToolsPlugin.development()
];

if (commonChunks) {
  Object.keys(commonChunks).forEach((key) => {
    const manifest = path.join(dll, `${key}-manifest.json`);
    if (!existsSync(manifest)) {
      console.error(`💔 💔 💔 Can not found ${manifest}`);
      console.log('----> Please run `yarn run dll` first');
      process.exit(1);
    }
    plugins.push(
      new webpack.DllReferencePlugin({
        context,
        // eslint-disable-next-line
        manifest: require(manifest)
      })
    );
  });
}

module.exports = {
  context,

  devtool: false,

  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${devPort}/__webpack_hmr`,
      'react-hot-loader/patch',
      './src/client.js'
    ]
  },

  output: {
    path: '/',
    filename: `${jsOutputDirectory}/[name].js`,
    chunkFilename: `${jsOutputDirectory}/[name].js`,
    publicPath: `http://${host}:${devPort}/`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: isomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        query: {
          limit: 10240
        }
      }
    ]
  },

  resolve: {
    modules: ['src', 'node_modules']
  },

  plugins
};
