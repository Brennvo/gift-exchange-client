import React from "react";
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  makeStyles,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "500px",
    maxWidth: "650px"
  }
});

const Login = ({ location }) => {
  const classes = useStyles();
  const returnUrl =
    location.state && location.state.from.pathname !== "/"
      ? `?returnTo=${location.state.from.pathname}`
      : "";

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Card className={classes.root}>
          <CardHeader title="Sign in to your account" />
          <CardContent>
            <a
              style={{ textDecoration: "none" }}
              href={`${process.env.REACT_APP_API_URL}/auth/google${returnUrl}`}
            >
              <GoogleLoginButton />
            </a>
            <a
              style={{ textDecoration: "none" }}
              href={`${process.env.REACT_APP_API_URL}/auth/facebook${returnUrl}`}
            >
              <FacebookLoginButton />
            </a>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <section>
      <h1>Login</h1>
      <nav>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          <li>
            <a
              style={{ textDecoration: "none" }}
              href={`${process.env.REACT_APP_API_URL}/auth/google${returnUrl}`}
            >
              <GoogleLoginButton />
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none" }}
              href={`${process.env.REACT_APP_API_URL}/auth/facebook${returnUrl}`}
            >
              <FacebookLoginButton />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Login;
