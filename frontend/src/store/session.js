import { csrfFetch } from "./csrf";

const SET_SESSION_USER = "session/SET_SESSION_USER";
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER";

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

export const sessionLogin = (user) => async (dispatch) => {
  //const { credential, password } = user;
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
    default:
      return state;
  }
};

export default sessionReducer;
