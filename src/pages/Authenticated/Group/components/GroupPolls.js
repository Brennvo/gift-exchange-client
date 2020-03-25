import React from "react";
import { useGroup } from "../../../../context/Group.context";
import { ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import List from "../../../../components/List";
import { useAuth } from "../../../../context/Auth.context";
import RedeemIcon from "@material-ui/icons/Redeem";
import HowToVoteIcon from "@material-ui/icons/HowToVote";

const GroupPolls = () => {
  const group = useGroup();
  const { user } = useAuth();

  return (
    <>
      <h2 style={{ marginBottom: 0 }}>Polls</h2>

      {group.participants.every(poll => poll.user.id === group.ownerId) &&
        group.invitations.length === 0 &&
        group.isPollingOpen &&
        "Send your first invitation to get polling started."}

      {group.participants.every(poll => poll.user.id === group.ownerId) &&
        group.invitations.length > 0 &&
        "Nobody has responded quite yet."}

      <List items={group.participants.filter(poll => poll.user.id != user.id)}>
        {poll => (
          <>
            <ListItemIcon>
              {group.isPollingOpen ? <HowToVoteIcon /> : <RedeemIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                group.isPollingOpen ? (
                  <Link
                    component={RouterLink}
                    to={`/group/${group.id}/poll/${poll.id}`}
                  >
                    {poll.user.username}
                  </Link>
                ) : (
                  poll.user.username
                )
              }
            />
          </>
        )}
      </List>
    </>
  );
};

export default GroupPolls;
