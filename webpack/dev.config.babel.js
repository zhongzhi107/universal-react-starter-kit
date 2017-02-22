import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from 'config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

const {
  appConfig: {
    host,
    port,
    paths: {
      tmp
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

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

const babelrcObjectDevelopment = (babelrcObject.env && babelrcObject.env.development) || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign(
  {},
  babelrcObjectDevelopment,
  babelrcObject,
  { plugins: combinedPlugins }
);
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server,
// and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
let reactTransform = null;
for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  const plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

const plugins = [
  // You can configure global / shared loader options with this plugin
  // and all loaders will receive these options.
  // In the future this plugin may be removed.
  // @see https://webpack.js.org/plugins/loader-options-plugin
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer],
    },
  }),

  // Style lint
  new StyleLintPlugin({
    files: '**/*.less',
    syntax: 'less',
    failOnError: true,  // Disable style lint error terminating here
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
    __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
  }),

  isomorphicToolsPlugin.development()
];

console.log('------', commonChunks);
if (commonChunks) {
  Object.keys(commonChunks).forEach((key) => {
    console.log('=====', path.join(dll, `${key}-manifest.json`));
    plugins.push(
      new webpack.DllReferencePlugin({
        context,
        // eslint-disable-next-line
        manifest: require(path.join(dll, `${key}-manifest.json`))
      }),
    );
  });
}

module.exports = {
  context,

  devtool: false, // 'inline-source-map',

  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${devPort}/__webpack_hmr`,
      './src/client.js'
    ]
  },

  output: {
    path: '/',
    filename: `${jsOutputDirectory}/[name].js`,
    chunkFilename: `${jsOutputDirectory}/[name].js`,
    publicPath: `http://${host}:${devPort}/`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: babelLoaderQuery,
          },
          {
            loader: 'eslint-loader',
          }
        ],
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
              localIdentName: '[local]___[hash:base64:5]',
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: isomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        query: {
          limit: 10240,
        },
      }
    ]
  },

  resolve: {
    modules: ['src', 'node_modules'],
  },

  plugins,
};
