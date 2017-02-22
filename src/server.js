import path from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import cookie from 'koa-cookie';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
import mkdirp from 'mkdirp';
import { appConfig } from 'config';
import pkg from '../package.json';
import serverSideRender from '../webpack/middleware/server-side-render';

const { host, port, apiHost, apiPort, paths: { logs, dist, tmp } } = appConfig;
const targetUrl = `http://${apiHost}:${apiPort}`;
const cwd = process.cwd();

// make log directory if it not exist
const logDir = path.join(cwd, logs);
mkdirp.sync(logDir);

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDir}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
});
const app = new Koa();

// Proxy to API server
if (process.env.ENABLE_PROXY) {
  app.use(convert(proxy({
    host: targetUrl,
    // Send cookie to real server
    jar: true,
    match: /^\/api\//,
    map: endpoint => endpoint.replace('/api', '')
  })));
}

app.use(morgan('combined', { stream: accessLogStream }));
app.use(cookie());
if (__DEVELOPMENT__) {
  app.use(serve(path.join(cwd, 'static')));
  app.use(serve(path.join(cwd, tmp)));
} else {
  // html-webpack-plugin will generate index.html in build for PWA
  // Here set index page not index.html to keep SSR
  app.use(serve(path.join(cwd, dist), { index: 'disable-index.html' }));
}
app.use(serverSideRender());

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  }
  console.info(`----\n==> ✅  ${pkg.name} is running, talking to API server on ${apiPort}.`);
  console.info(`==> 💻  Open http://${host}:${port} in a browser to view the app.`);

  if (__DEVELOPMENT__) {
    // Open Chrome
    require('../tools/open-browser')(`http://${host}:${port}/`);
  }
});
