// import {About} from 'containers';

export default {
  path: 'about',
  // component: About,
  getComponent(nextState, callback) {
    // import('../containers/About/About').then(module => {
    //   callback(null, module);
    // }).catch(err => {
    //   console.log("Chunk loading failed: ", err);
    // });
    require.ensure([], (require) => {
      callback(null, require('containers/About'));
    });
  },
};
