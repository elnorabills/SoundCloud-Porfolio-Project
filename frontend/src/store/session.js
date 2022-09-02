import { csrfFetch } from "./csrf";

const SET_SESSION_USER = "session/SET_SESSION_USER";
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER";
const RETAIN_USER = "session/RETAIN_USER";
const SIGN_UP = "session/sign-up";


const setSessionUser = (user) => {
  return {
    type: SET_SESSION_USER,
    payload: user,
  };
};

const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER,
  };
};

const retainUser = (user) => {
  return {
    type: RETAIN_USER,
    payload: user
  }
}

const signUp = (user) => {
  return {
    type: SIGN_UP,
    payload: user
  }
}

export const sessionLogin = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const userLogin = await response.json();
    dispatch(setSessionUser(userLogin));
    return userLogin;
  }
};

export const restoreSessionUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session")
  const { user } = await response.json();
  if (user) {
    dispatch(retainUser(user))
    return response;
  }
}

export const signupUser = (user) => async (dispatch) => {
  const newUser = await csrfFetch("/api/users/sign-up", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (newUser.ok) {
    const user = await newUser.json();
    dispatch(signUp(user));
    return user;
  }
}

export const logoutUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/logout", {
    method: "DELETE",
  });
  dispatch(removeSessionUser());
  return response;
}

const defaultState = { user: null };

const sessionReducer = (state = defaultState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_SESSION_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_SESSION_USER:
      newState.user = null;
      return newState;
    case RETAIN_USER:
      newState.user = action.payload;
      return newState;
    case SIGN_UP:
      newState.user = action.payload;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
