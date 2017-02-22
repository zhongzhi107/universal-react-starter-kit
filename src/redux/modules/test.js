const LOAD = 'test/LOAD';
const LOAD_SUCCESS = 'test/LOAD_SUCCESS';
const LOAD_FAIL = 'test/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: {
    message: '== This is a default message! =='
  }
};

/**
 * @module redux/modules/auth
 * @return {Object}
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

/**
 * Check whether the data has been loaded
 * @return {Boolean}
 */
export function isLoaded(globalState) {
  return globalState.test && globalState.test.loaded;
}

/**
 * Load auth data from API server
 * @return {Object}
 */
export function load() {
  console.log('--------test load()');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/api/test') // params not used, just shown as demonstration
  };
}
