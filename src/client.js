/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { useScroll } from 'react-router-scroll';
import { AppContainer } from 'react-hot-loader';
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
        <AppContainer>
          <Router {...renderProps} render={renderRouter} history={history}>
            {routes}
          </Router>
        </AppContainer>
      </Provider>,
      dest
    );
  });
};


if (!__DISABLE_SOCKET__) {
  const socket = require('socket.io-client')();
  socket.on('connect', () => {
    console.log('-- client connect --');
  });
  socket.on('heartbeat', (data) => {
    console.log('-- heartbeat --', data);
  });
  socket.on('disconnect', () => {
    console.log('-- client disconnect --');
  });
  global.socket = socket;
}

console.log('-----------process.env.NODE_ENV,', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'local') {
  require('offline-plugin/runtime').install();
}

render(getRoutes(store));

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  // eslint-disable-next-line
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error(
      'Server-side React render was discarded.',
      'Make sure that your initial render does not contain any client-side code.'
    );
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <AppContainer>
        <div>
          {/* component */}
          <DevTools />
        </div>
      </AppContainer>
    </Provider>,
    dest
  );
}

if (module.hot) {
  module.hot.accept();
  // module.hot.accept('./containers/App/index.js', () => { console.log('-------'); });
}
