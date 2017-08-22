import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import autoprefixer from 'autoprefixer';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from 'config';
import isomorphicToolsConfig from './webpack-isomorphic-tools';

const {
  appConfig: {
    paths: {
      tmp
    },
  },
  buildConfig: {
    commonChunks,
    dataUrlLimit
  }
} = config;
const cwd = process.cwd();
const context = path.resolve(__dirname, '..');
const dll = path.resolve(cwd, tmp);
const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig);

export default {
  context,
  devtool: false,
  entry: commonChunks,
  output: {
    path: dll,
    filename: '[name].js',
    library: '[name]'
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' }
        ]
      },
      {
        // https://github.com/reactjs/redux/pull/2059
        test: /combineReducers\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: /\s*return 'Unexpected ' \+ \(unexpectedKeys\.length.*;/i,
          replace: '/* Disable dynamic reducer warnings in dev environment. */',
          flags: 'g'
        }
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: isomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: dataUrlLimit
        }
      },
      {
        test: isomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'url-loader',
        options: {
          limit: dataUrlLimit
        }
      }
    ]
  },

  resolve: {
    modules: ['src', 'node_modules']
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer]
      }
    }),

    new CleanPlugin([dll, 'webpack-assets.json'], {
      root: cwd
    }),

    new webpack.DllPlugin({
      path: path.join(dll, '[name]-manifest.json'),
      name: '[name]'
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      // DISABLE redux-devtools HERE
      __DEVTOOLS__: true
    })
  ]
};
