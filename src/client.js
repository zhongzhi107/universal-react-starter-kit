/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { useScroll } from 'react-router-scroll';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const renderRouter = props => <ReduxAsyncConnect
  {...props}
  helpers={{ client }}
  filter={item => !item.deferred}
  render={applyRouterMiddleware(useScroll())}
/>;

const render = (routes) => {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Provider store={store} key="provider">
        <Router {...renderProps} render={renderRouter} history={history}>
          {routes}
        </Router>
      </Provider>,
      dest
    );
  });
};

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

render(getRoutes(store));

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {/* component */}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
