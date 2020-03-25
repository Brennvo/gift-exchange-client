import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  section: {
    height: "100%"
  }
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      component="section"
      className={classes.section}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default LoadingSpinner;
