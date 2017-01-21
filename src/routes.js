import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import App from 'containers/App';
import NotFound from 'containers/NotFound';

export default store => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('containers/Test'));
        });
      }} />
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
        path="test"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Test'));
          });
        }}
      />

      {/* Catch all route */}
      <Route
        path="*"
        getComponent={NotFound}
        status={404}
      />
    </Route>
  );
};
