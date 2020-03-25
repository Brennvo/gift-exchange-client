import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const emptyUser = {
  id: null,
  username: null,
  email: null,
  token: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH": {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: {
          id: action.id,
          username: action.username
        }
      };
    }
    case "INVALIDATE_USER": {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: emptyUser
      };
    }
    default:
      return { ...state };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: emptyUser,
    isLoading: true
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then(({ data }) => {
        dispatch({
          type: "SET_AUTH",
          id: data.id,
          username: data.username
        });
      })
      .catch(err => {
        dispatch({ type: "INVALIDATE_USER" });
      });
  }, []);

  const logout = () =>
    fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      credentials: "include"
    }).then(_ => {
      dispatch({ type: "INVALIDATE_USER" });
    });
  const login = provider =>
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/auth/${provider}`
    );

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthStateContext.Provider
      value={{
        login,
        logout,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthStateContext);
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  return context;
};

export {
  useAuth,
  useAuthDispatch,
  AuthProvider,
  AuthStateContext,
  AuthDispatchContext
};
