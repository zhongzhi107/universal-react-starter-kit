import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import httpProxy from 'http-proxy';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
// eslint-disable-next-line
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
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  // ws: true
});

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  const json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    const html = ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
      />
    );
    res.send(`<!doctype html>\n${html}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  const matchOptions = {
    history,
    routes: getRoutes(store),
    location: req.originalUrl
  };
  match(matchOptions, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        const html = ReactDOM.renderToString(
          <Html
            assets={webpackIsomorphicTools.assets()}
            component={component}
            store={store}
          />
        );

        res.status(200);
        res.send(`<!doctype html>\n${html}`);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (port) {
  server.listen(port, (err) => {
    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }
    console.info(`----\n==> ✅  ${meta.title} is running, talking to API server on ${apiPort}.`);
    console.info(`==> 💻  Open http://${host}:${port} in a browser to view the app.`);

    if (__DEVELOPMENT__) {
      // Open Chrome
      require('../tools/open-browser')(port);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
