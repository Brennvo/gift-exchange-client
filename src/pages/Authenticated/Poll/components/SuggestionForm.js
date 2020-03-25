import React from "react";
import { Grid, Button } from "@material-ui/core";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import TextInput from "../../../../components/TextInput";

const SuggestionForm = ({ title, description, link, onChange, onSubmit }) => (
  <Grid
    component="form"
    container
    direction="column"
    justify="center"
    spacing={2}
    onSubmit={onSubmit}
    style={{ maxWidth: "800px" }}
  >
    <Grid item>
      <TextInput
        fullWidth
        label="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
    </Grid>

    <Grid item>
      <TextInput
        fullWidth
        label="Description"
        name="description"
        multiline
        value={description}
        onChange={onChange}
      />
    </Grid>

    <Grid item>
      <Grid container alignItems="flex-end">
        <Grid item style={{ flexGrow: 1 }}>
          <TextInput
            label="Link"
            name="link"
            fullWidth
            value={link}
            onChange={onChange}
          />
        </Grid>

        <Grid item>
          <LinkRoundedIcon />
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
      <Button type="submit" variant="contained" color="secondary">
        Offer Suggestion
      </Button>
    </Grid>
  </Grid>
);

export default SuggestionForm;
