import React from "react";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

const GroupAlert = ({ isPollingOpen, date }) =>
  isPollingOpen ? (
    <Alert severity="info">Polls close {moment(date).fromNow()}.</Alert>
  ) : (
    <Alert severity="warning">Polling has closed.</Alert>
  );

export default GroupAlert;
