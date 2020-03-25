import React from "react";
import List from "../../../../components/List";
import {
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import CancelScheduleSendRoundedIcon from "@material-ui/icons/CancelScheduleSendRounded";

const InvitationList = ({ invitations, onRevoke }) => {
  return (
    <List items={invitations}>
      {email => (
        <>
          <ListItemIcon>
            <IconButton
              style={{ color: "darkred", padding: "0" }}
              onClick={() => onRevoke(email)}
            >
              <CancelScheduleSendRoundedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={email} />
        </>
      )}
    </List>
  );
};

export default InvitationList;
