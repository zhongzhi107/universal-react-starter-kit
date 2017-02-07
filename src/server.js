import path from 'path';
import PrettyError from 'pretty-error';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import cookie from 'koa-cookie';
import favicon from 'koa-favicon';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getRoutes from './routes';
import {
  apiHost,
  apiPort,
  host,
  port,
  app as meta
} from './config';

const targetUrl = `http://${apiHost}:${apiPort}`;
const pretty = new PrettyError();
const app = new Koa();

// Proxy to API server
app.use(convert(proxy({
  host: targetUrl,
  // Send cookie to real server
  jar: true,
  match: /^\/api\//,
  map: endpoint => endpoint.replace('/api', '')
})));
app.use(cookie());
app.use(serve(path.join(__dirname, '..', 'static')));
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(async (ctx) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(ctx);
  const memoryHistory = createHistory(ctx.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    const html = ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
      />
    );
    ctx.body = `<!doctype html>\n${html}`;
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  const matchOptions = {
    history,
    routes: getRoutes(store),
    location: ctx.originalUrl
  };

  try {
    await new Promise((resolve, reject) => {
      match(matchOptions, async (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          const {pathname, search} = redirectLocation;
          ctx.redirect(`${pathname}${search}`);
        } else if (error) {
          console.error('ROUTER ERROR:', pretty.render(error));
          ctx.status(500);
          hydrateOnClient();
          reject();
        } else if (renderProps) {
          try {
            await loadOnServer({ ...renderProps, store, helpers: client });
            const component = (
              <Provider store={store} key="provider">
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            );
            global.navigator = { userAgent: ctx.headers['user-agent'] };
            const html = ReactDOM.renderToString(
              <Html
                assets={webpackIsomorphicTools.assets()}
                component={component}
                store={store}
              />
            );
            ctx.body = `<!doctype html>\n${html}`;
            resolve();
          } catch (err) {
            console.error(err);
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
});

if (port) {
  app.listen(port, (err) => {
    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }
    console.info(`----\n==> ✅  ${meta.title} is running, talking to API server on ${apiPort}.`);
    console.info(`==> 💻  Open http://${host}:${port} in a browser to view the app.`);

    if (__DEVELOPMENT__) {
      // Open Chrome
      require('../tools/open-browser')(`http://${host}:${port}/`);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
