import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useUserGroupsDispatch } from "../../context/UserGroups.context";
import TextInput from "../../components/TextInput";
import { Grid, TextField, Button } from "@material-ui/core";

const CreateGroup = () => {
  const history = useHistory();
  const dispatch = useUserGroupsDispatch();
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [group, setGroup] = useState({});

  const onChange = e => {
    const { target } = e;
    setGroup(prevGroup => ({
      ...prevGroup,
      [target.name]: target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSending(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/group`, {
        groupName: group.name,
        voteEndDt: group.date
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
          onChange={onChange}
          value={group.name || ""}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Last day to vote"
          type="date"
          name="date"
          onChange={onChange}
          value={group.date || ""}
          InputLabelProps={{
            shrink: true
          }}
        />
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
