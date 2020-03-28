import React, { useState, useReducer } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useUserGroupsDispatch } from "../../context/UserGroups.context";
import TextInput from "../../components/TextInput";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

const emailReducer = (emails, action) => {
  switch (action.type) {
    case "NEW_EMAIL": {
      return [...emails, ""];
    }
    case "CHANGE_EMAIL": {
      return emails.map((email, i) =>
        action.indexToChange === i ? action.value : email
      );
    }
    case "DELETE_EMAIL": {
      return emails.filter((email, i) => action.indexToDelete !== i);
    }
    default:
      return [...emails];
  }
};

const CreateGroup = () => {
  const history = useHistory();
  const dispatch = useUserGroupsDispatch();
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [emails, emailDispatch] = useReducer(emailReducer, []);

  const onEmailChange = (indexToChange, e) => {
    const { target } = e;
    emailDispatch({
      type: "CHANGE_EMAIL",
      indexToChange,
      value: target.value
    });
  };

  const deleteEmail = indexToDelete =>
    emailDispatch({
      type: "DELETE_EMAIL",
      indexToDelete
    });

  const newEmail = () => emailDispatch({ type: "NEW_EMAIL" });

  const handleSubmit = e => {
    e.preventDefault();
    setIsSending(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/group`, {
        groupName: name,
        voteEndDt: date,
        emails
      })
      .then(({ data: group }) => {
        dispatch({
          type: "ADD_GROUP",
          isUserGenerated: true,
          group
        });
        history.push(`/group/${group.id}`);
      })
      .catch(err => {
        setIsSending(false);
        setIsError(true);
      });
  };

  if (isSending) {
    return <section>Creating Group...</section>;
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      component="form"
      onSubmit={handleSubmit}
      spacing={3}
      style={{ maxWidth: "800px" }}
    >
      {isError && <p>Sorry, an error has occurred. Please try again.</p>}

      <Grid item>
        <TextInput
          label="Group name"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Last day to vote"
          type="date"
          name="date"
          onChange={e => setDate(e.target.value)}
          value={date}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>

      {emails.length > 0 &&
        emails.map((email, i) => (
          <Grid item key={i}>
            <Grid container alignItems="flex-end">
              <Grid item>
                <TextInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={e => onEmailChange(i, e)}
                />
              </Grid>

              <Grid item>
                <IconButton onClick={() => deleteEmail(i)}>
                  <HighlightOffRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}

      <Grid item>
        <Button variant="contained" onClick={newEmail}>
          Add Participant
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" type="submit">
          Create Group
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateGroup;
