import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, ListItemIcon, Modal } from "@material-ui/core";
import moment from "moment";

import { useAuth } from "../../context/Auth.context";
import {
  useUserGroups,
  useUserGroupsDispatch
} from "../../context/UserGroups.context";
import List from "../../components/List";
import Alert from "@material-ui/lab/Alert";
import HeaderBtn from "../../components/HeaderBtn";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { managedGroups, participantGroups, isLoading } = useUserGroups();
  const dispatch = useUserGroupsDispatch();
  const [view, setView] = useState(
    participantGroups.length === 0 ? "Managed" : "Participant"
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group`)
      .then(res => {
        console.log("all groups: ", res.data);
        dispatch({
          type: "SET_GROUPS",
          managedGroups: res.data.filter(group => group.ownerId === user.id),
          participantGroups: res.data.filter(group => group.ownerId !== user.id)
        });
      })
      .catch(err => {
        dispatch("ERROR");
      });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <HeaderBtn
        variant="h1"
        text="Groups"
        showBtn
        handleBtnClick={() => history.push("/group/create")}
      />

      {managedGroups.length === 0 && participantGroups.length === 0 && (
        <Alert severity="info">
          You aren't in any gift exchanges. Begin one now!
        </Alert>
      )}

      <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
        <Tab disableRipple value="Managed" label="Managed" />
        <Tab disableRipple value="Participant" label="Participant" />
        <Tab disableRipple value="Archived" label="Archived" />
      </Tabs>

      <List
        items={
          view === "Managed"
            ? managedGroups
            : view === "Participant"
            ? participantGroups
            : []
        }
      >
        {group => (
          <>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`/group/${group.id}`}>
                  {group.groupName}
                </Link>
              }
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    Polls close -
                  </Typography>{" "}
                  {moment.utc(group.voteEndDt).format("M/DD/YY")}
                </>
              }
            />
          </>
        )}
      </List>
    </>
  );
};

export default Home;
