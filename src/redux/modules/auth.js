const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const IS_VALID = 'auth/IS_VALID';
const IS_VALID_SUCCESS = 'auth/IS_VALID_SUCCESS';
const IS_VALID_FAIL = 'auth/IS_VALID_FAIL';
const TIMESTAMP = 'auth/TIMESTAMP';

const initialState = {
  loaded: false,
  captchaValiding: false,
  captchaIsValid: null,
  timestamp: Date.now(),
};

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
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case IS_VALID:
      return {
        ...state,
        captchaValiding: true,
      };
    case IS_VALID_SUCCESS:
      return {
        ...state,
        captchaValiding: false,
        captchaIsValid: action.result.isValid,
      };
    case IS_VALID_FAIL:
      return {
        ...state,
        captchaValiding: false,
        validError: action.error,
      };
    case TIMESTAMP:
      return {
        ...state,
        timestamp: Date.now()
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function isValidCaptcha(data) {
  return {
    types: [IS_VALID, IS_VALID_SUCCESS, IS_VALID_FAIL],
    promise: (client) => client.post('/validCaptcha', {
      data
    })
  };
}

export function updateTimestamp() {
  return {
    type: TIMESTAMP,
  };
}

export function updateCaptchaValiding() {
  return {
    type: IS_VALID,
  };
}
