// import {Test} from 'containers';

export default {
  path: 'test',
  // component: Test,
  getComponent(nextState, callback) {
    // 不报错，但code splitting失效了
    // import('../containers/Test/Test').then(module => {
    //   callback(null, module);
    // }).catch(err => {
    //   console.log("Chunk loading failed: ", err);
    // });
    require.ensure([], (require) => {
      callback(null, require('containers/Test'));
    });
  },
};
