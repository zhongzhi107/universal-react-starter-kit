import Express from 'express';
import webpack from 'webpack';
import {host, port} from 'config';
import webpackConfig from './dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const compiler = webpack(webpackConfig);

const HOST = host || 'localhost';
const PORT = (Number(port) + 1) || 3001;

const serverOptions = {
  contentBase: `http://${HOST}:${PORT}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

const app = new Express();
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> 🚧  Webpack development server listening on port ${PORT}`);
  }
});
