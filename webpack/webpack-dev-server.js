import Koa from 'koa';
import webpack from 'webpack';
import { appConfig } from 'config';
import devMiddleware from './middleware/webpack-dev';
import hotMiddleware from './middleware/webpack-hot';
import webpackConfig from './dev.config.babel';

const { host, port } = appConfig;
const devPort = parseInt(port, 10) + 1;
const serverOptions = {
  contentBase: `http://${host}:${devPort}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};
const compiler = webpack(webpackConfig);
const app = new Koa();

app.use(devMiddleware(compiler, serverOptions))
  .use(hotMiddleware(compiler));

app.listen(devPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> 🚧  Webpack development server listening on port ${devPort}`);
  }
});
