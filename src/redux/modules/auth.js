const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const initialState = {
  loaded: false,
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
        user: action.result
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
 * Check whether the auth data has been loaded
 * @return {Boolean}
 */
export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

/**
 * Load auth data from API server
 * @return {Object}
 */
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/api/loadAuth')
  };
}
