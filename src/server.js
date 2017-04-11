import path from 'path';
import url from 'url';
import http from 'http';
import Koa from 'koa';
import compress from 'koa-compress';
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

const { host, port, apiPort, proxies, paths: { logs, dist, tmp } } = appConfig;
const cwd = process.cwd();

// make log directory if it not exist
const logDir = path.join(cwd, logs);
mkdirp.sync(logDir);

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDir}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});
const app = new Koa();
let serverInstance = app;

if (process.env.ENABLE_PROXY === 'true') {
  Object.keys(proxies).forEach((key) => {
    const from = new RegExp(key);
    const to = proxies[key];
    // eslint-disable-next-line
    const { host, protocol } = url.parse(to);
    app.use(convert(proxy({
      host: `${protocol}//${host}`,
      jar: true,
      match: from,
      map: endpoint => endpoint.replace(from, to)
    })));
  });
}

app.use(morgan('combined', { stream: accessLogStream }));
app.use(cookie());
if (__DEVELOPMENT__) {
  // Load assets from static
  app.use(serve(path.join(cwd, 'static')));
  // Load dll.js from tmp
  app.use(serve(path.join(cwd, tmp)));
} else {
  app.use(convert(compress()));
  app.use(serve(path.join(cwd, dist)));
}
app.use(serverSideRender());

if (!__DISABLE_SOCKET__) {
  const server = http.createServer(app.callback());
  const ws = require('socket.io')(server);

  console.log(`socketio starting ${new Date().toLocaleString()}`);

  ws.on('connection', (socket) => {
    console.log('-- connected --');
    // node server time
    socket.emit('heartbeat', Date.now());
    setInterval(() => {
      socket.emit('msg', {
        id: Date.now(),
        from: 'Robot',
        text: `Hello, ${Date.now()}`
      });
    }, 5000);
    socket.on('event', (data) => {
      console.log('event: ', data);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });

  serverInstance = server;
}


serverInstance.listen(port, (err) => {
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
