import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

// Redirect users with bad request
const useErrorIntercept = () => {
  const history = useHistory();

  axios.interceptors.response.use(
    res => res,
    err => {
      switch (err.response.status) {
        case 404:
          history.push("/not-found");
          return Promise.reject(err);
        case 401:
          history.push("/login");
          return Promise.reject(err);
        default:
          return Promise.reject(err);
      }
    }
  );
};

export default useErrorIntercept;
