import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: localStorage.getItem("user") || null
};

export const authContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        error: action.payload
      };
    case "LOGOUT":
      return {
        user: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user",(state.user));
    localStorage.setItem("isAuthenticated",(state.user !== null));
  }, [state.user]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        dispatch
      }}
    >
      {children}
    </authContext.Provider>
  );
};