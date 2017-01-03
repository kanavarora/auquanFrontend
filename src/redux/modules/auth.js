import cookie from 'react-cookie';

// const proxyCookie = __SERVER__ ? global.cookie : cookie;

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const COOKIE_USERNAME = '_uc_user_username';
const COOKIE_FIRSTNAME = '_uc_user_firstname';
const COOKIE_LASTNAME = '_uc_user_lastname';
const COOKIE_TOKEN = '_uc_user_token';

function saveUserToCookie(user, token) {
  const expires = new Date(+new Date + 31536000000);
  cookie.save(COOKIE_USERNAME, user.username, {path: '/', expires: expires});
  cookie.save(COOKIE_FIRSTNAME, user.firstName, {path: '/', expires: expires});
  cookie.save(COOKIE_LASTNAME, user.lastName, {path: '/', expires: expires});
  cookie.save(COOKIE_TOKEN, token, {path: '/', expires: expires});
  return true;
}

function removeUserFromCookie() {
  cookie.remove(COOKIE_USERNAME, {path: '/'});
  cookie.remove(COOKIE_FIRSTNAME, {path: '/'});
  cookie.remove(COOKIE_LASTNAME, {path: '/'});
  cookie.remove(COOKIE_TOKEN, {path: '/'});
  return true;
}

function getUserFromCookie() {
  return cookie.load(COOKIE_TOKEN) ? {
    username: cookie.load(COOKIE_USERNAME),
    firstName: cookie.load(COOKIE_FIRSTNAME),
    lastName: cookie.load(COOKIE_LASTNAME),
    token: cookie.load(COOKIE_TOKEN)
  } : null;
}

const initialState = {
  loaded: false,
  user: getUserFromCookie(),
  token: cookie.load(COOKIE_TOKEN) || null,
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
        user: getUserFromCookie()
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
      saveUserToCookie(action.result.user, action.result.token);
      return {
        ...state,
        loggingIn: false,
        user: action.result.user,
        token: action.result.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      removeUserFromCookie();
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
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      saveUserToCookie(action.result.user, action.result.token);
      return {
        ...state,
        registeringIn: false,
        user: action.result.user,
        token: action.result.token
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        user: null,
        registerError: action.error.error
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
    type: LOAD_SUCCESS
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function registerUser(userDetails) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/api/createUser', {
      data: userDetails
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/api/logout')
  };
}
