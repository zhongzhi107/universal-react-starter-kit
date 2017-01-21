// import {Registry} from 'containers';

export default {
  path: 'registry',
  // component: Registry,
  onEnter: () => {console.log('onEnter')},
  getComponent(nextState, callback) {
    // 不报错，但code splitting失效了
    // import('../containers/Registry/Registry').then(module => {
    //   callback(null, module);
    // }).catch(err => {
    //   console.log("Chunk loading failed: ", err);
    // });
    require.ensure([], (require) => {
      callback(null, require('containers/Registry'));
    });
  },
};
