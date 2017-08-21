const LOAD = 'home/LOAD';
const LOAD_SUCCESS = 'home/LOAD_SUCCESS';
const LOAD_FAIL = 'home/LOAD_FAIL';

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
  return globalState.home && globalState.home.loaded;
}

/**
 * Load auth data from API server
 * @return {Object}
 */
export function load(name) {
  console.log('--------home load(), name: ', name);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/api/home', {
      // qureystring for GET method
      params: { name },
      // data for POST method
      data: {}
    })
  };
}
