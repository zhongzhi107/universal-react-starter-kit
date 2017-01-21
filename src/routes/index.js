import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from 'containers/App';

// import {App, Test} from 'containers';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
// import {
//     App,
//     // Chat,
//     // Home,
//     // Widgets,
//     About,
//     Test,
//     Registry,
//     Login,
//     LoginSuccess,
//     // Survey,
//     NotFound,
//     // Pagination,
//   } from 'containers';

// if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default (store) => {
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       console.log('oops, not logged in, so can\'t be here!');
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  return {
    path: '/',
    component: App,
    // indexRoute: {
    //   component: require('containers/Test'),
    // },

    // packing index(test.js) into 0-xxxx.js
    getIndexRoute(location, callback) {
      // import('./containers/About/About').then(module => {
      //   callback(null, {component: module});
      // }).catch(err => {
      //   console.log("Chunk loading failed: ", err);
      // });
      require.ensure([], (require) => {
        callback(null, {
          component: require('containers/Test'),
        });
      });
    },

    // packing routes.js into main.js
    childRoutes: [
      // packing about/registry into 1..n-xxxx.js
      require('./about'),
      require('./test'),
      require('./registry'),
      require('./404'),
    ],

    // getChildRoutes(location, callback) {
    //   // Promise.all([
    //   //   import('./routes/about'),
    //   //   import('./routes/test')
    //   // ]).then(modules => {
    //   //   callback(null, modules);
    //   // }).catch(err => {
    //   //   console.log("Chunk loading failed: ", err);
    //   // });
    //   require.ensure([], (require) => {
    //     callback(null, [
    //       require('./routes/about'),
    //       require('./routes/test'),
    //       require('./routes/registry'),
    //     ])
    //   });
    // },

  };
  /**
   * Please keep routes in alphabetical order
   */
  // return (
  //   <Route path="/" component={App}>
  //     { /* Home (main) route */ }
  //     <IndexRoute component={Test}/>
  //     <Route path="login" component={Login}/>
  //     <Route path="test" component={Test}/>
  //     <Route path="about" component={About}/>
  //     <Route path="registry" component={Registry}/>
  //
  //     { /* Routes requiring login */ }
  //     <Route onEnter={requireLogin}>
  //       { /* <Route path="chat" component={Chat}/> */ }
  //       <Route path="loginSuccess" component={LoginSuccess}/>
  //     </Route>
  //
  //     { /* Routes
  //     <Route path="pagination" component={Pagination}/>
  //     <Route path="survey" component={Survey}/>
  //     <Route path="widgets" component={Widgets}/>
  //      */ }
  //
  //     { /* Catch all route */ }
  //     <Route path="*" component={NotFound} status={404} />
  //   </Route>
  // );
};
