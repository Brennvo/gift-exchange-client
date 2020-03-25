import React from "react";
import { useAuth } from "../context/Auth.context";
import { Redirect, Route, useParams, useRouteMatch } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
