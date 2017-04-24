import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'containers/App';
import NotFound from 'containers/NotFound';

// eslint-disable-next-line
export default (/* store */) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Home'));
          });
        }}
      />
      <Route
        path="about"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/About'));
          });
        }}
      />
      <Route
        path="registry"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Registry'));
          });
        }}
      />
      <Route
        path="chat"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Chat'));
          });
        }}
      />

      {/* Catch all route */}
      <Route
        path="*"
        component={NotFound}
        status={404}
      />
    </Route>
  );
};
