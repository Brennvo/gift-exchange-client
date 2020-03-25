import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const HeaderBtn = ({ variant = "h1", text, handleBtnClick }) => {
  let Header;
  switch (variant) {
    case "h1": {
      Header = ({ children }) => <h1>{children}</h1>;
      break;
    }
    case "h2": {
      Header = ({ children }) => (
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>{children}</h2>
      );
    }
  }
  return (
    <Grid
      container
      alignItems="center"
      wrap="nowrap"
      style={{
        marginBlockStart: variant === "h2" ? "19px" : "initial"
      }}
    >
      <Grid item>
        <Header>{text}</Header>
      </Grid>

      <Grid item>
        <IconButton color="secondary" onClick={handleBtnClick}>
          <AddCircleIcon fontSize={variant === "h1" ? "large" : "small"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default HeaderBtn;
