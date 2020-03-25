import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import TextInput from "../../../../components/TextInput";

const InvitationForm = ({ onInvite, email, onChange }) => {
  return (
    <Grid
      component="form"
      container
      direction="column"
      justify="center"
      spacing={2}
      onSubmit={e => {
        e.preventDefault();
        onInvite(email);
      }}
      style={{ maxWidth: "800px" }}
    >
      <Grid item>
        <TextInput
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={e => onChange(e.target.value)}
        />
      </Grid>

      <Grid item>
        <Button type="submit" variant="contained" color="secondary">
          Send Invitation
        </Button>
      </Grid>
    </Grid>
  );
};

export default InvitationForm;
