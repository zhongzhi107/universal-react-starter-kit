import path from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import cookie from 'koa-cookie';
import favicon from 'koa-favicon';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
import mkdirp from 'mkdirp';
import { appConfig } from 'config';
import pkg from '../package.json';
import serverSideRender from '../webpack/middleware/server-side-render';

const { host, port, apiHost, apiPort, paths: { logs, dist } } = appConfig;
const targetUrl = `http://${apiHost}:${apiPort}`;
const webroot = path.join(__dirname, '..', __DEVELOPMENT__ ? 'static' : dist);

// make log directory if it not exist
const logDir = path.join(process.cwd(), logs);
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

app.use(morgan('combined', { stream: accessLogStream }))
  .use(cookie())
  // html-webpack-plugin will generate index.html in build for PWA
  // Here set index page not index.html to keep SSR
  .use(serve(webroot, { index: 'disable-index.html' }))
  .use(favicon(path.join(webroot, 'favicon.ico')))
  .use(serverSideRender());

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
