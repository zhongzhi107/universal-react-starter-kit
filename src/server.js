import path from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import cookie from 'koa-cookie';
import favicon from 'koa-favicon';
import { host, port, apiHost, apiPort } from 'config/environments';
import { dist } from 'config/compiler';
import pkg from '../package.json';
import serverSideRender from '../webpack/middleware/server-side-render';

const targetUrl = `http://${apiHost}:${apiPort}`;
const webroot = path.join(__dirname, '..', dist);
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
app.use(cookie())
  // html-webpack-plugin will generate index.html in build for PWA
  // Here set index page not index.html to keep SSR
  .use(serve(webroot, { index: 'disable-index.html' }))
  .use(favicon(path.join(webroot, 'favicon.ico')))
  .use(serverSideRender());

if (port) {
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
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
