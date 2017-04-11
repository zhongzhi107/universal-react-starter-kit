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
    globals: {
      __DISABLE_SOCKET__
    },
  },
  buildConfig: {
    commonChunks
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
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', query: { importLoaders: 2 } },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', query: { importLoaders: 2 } },
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

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer]
      }
    }),

    new CleanPlugin([dll], {
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
      __DISABLE_SOCKET__,
      // DISABLE redux-devtools HERE
      __DEVTOOLS__: true
    })
  ]
};
