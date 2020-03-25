import React from "react";
import { Grid } from "@material-ui/core";

const ModalContent = ({ children }) => (
  <Grid
    container
    component="section"
    justify="center"
    style={{
      padding: "25px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "80vw",
      maxWidth: "1200px"
    }}
  >
    {children}
  </Grid>
);

export default ModalContent;
