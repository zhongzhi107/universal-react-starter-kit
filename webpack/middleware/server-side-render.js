import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import Html from 'helpers/Html';
import getRoutes from 'routes';

const pretty = new PrettyError();

/**
 * Add error handle for loadOnServer
 *
 * @param {Object} opt
 * @return {Promise}
 */
function proxyLoadOnServer(opt) {
  return loadOnServer(opt).then((result) => {
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      for (let k = 0, pairs = Object.keys(item); k < pairs.length; k++) {
        const key = pairs[k];
        const val = item[key];
        if (val && typeof val === 'object' && 'error' in val) {
          const err = val.error;
          if (!val.error) {
            val.error = {
              message: 'you may directly call reject(), error is null'
            };
          } else if (typeof val.error === 'object') {
            if (Array.isArray(val.error)) {
              val.error = {
                message: 'you may call reject rather than resolve, result is a array',
                origin: err
              };
            } else if (!Object.keys(err).length) {
              val.message = 'call reject({}), error is a empty object.';
            }
          } else {
            const message = val.error.toString && val.error.toString();
            val.error = {
              message,
              origin: err
            };
          }
          val.error.message = val.error.message || '';
          val.error.message += `. task key: ${key}`;
          return Promise.reject(val.error);
        }
      }
    }
    return result;
  });
}

/**
 * koa middlewave for SSR
 *
 * @module webpack/middlewave/serve-side-render
 * @return {Function}
 */
export default function () {
  return async (ctx) => {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }
    const client = new ApiClient(ctx);
    const memoryHistory = createHistory(ctx.originalUrl);
    const store = createStore(memoryHistory, client);
    const history = syncHistoryWithStore(memoryHistory, store);

    /**
     * Render Index page only on client
     */
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
            const { pathname, search } = redirectLocation;
            ctx.redirect(`${pathname}${search}`);
          } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            ctx.status = 500;
            hydrateOnClient();
            reject();
          } else if (renderProps) {
            try {
              await proxyLoadOnServer({ ...renderProps, store, helpers: client });
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
              ctx.status = 500;
              reject(err);
            }
          }
        });
      });
    } catch (error) {
      // Exception handling
      ctx.status = 500;
      console.log(pretty.render(error));
    }
  };
}
