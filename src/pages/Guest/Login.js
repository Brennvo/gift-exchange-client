import React from "react";

const Login = ({ location }) => {
  const returnUrl =
    location.state && location.state.from.pathname !== "/"
      ? `?returnTo=${location.state.from.pathname}`
      : "";

  return (
    <section>
      <p>Sign-In</p>
      <nav>
        <ul>
          <li>
            <a
              href={`${process.env.REACT_APP_API_URL}/auth/google${returnUrl}`}
            >
              Login with Google
            </a>
          </li>
          <li>
            <a
              href={`${process.env.REACT_APP_API_URL}/auth/facebook${returnUrl}`}
            >
              Login with Facebook
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Login;
