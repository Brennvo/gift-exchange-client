import React from "react";
import {
  ListItemIcon,
  IconButton,
  Grid,
  Link,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";

const VoteArrow = ({ votes, onVote }) => (
  <Grid container style={{ width: "0" }} direction="column" alignItems="center">
    <Grid item>
      <IconButton onClick={onVote} style={{ padding: "0" }}>
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Grid>

    <Grid item>{votes}</Grid>
  </Grid>
);

const SuggestionItem = ({
  suggestion: { id, title, description, link, votes },
  onVote
}) => (
  <>
    <ListItemIcon>
      <VoteArrow votes={votes} onVote={() => onVote(id)} />
    </ListItemIcon>

    <ListItemText
      primary={title}
      secondary={
        <>
          <Typography component="span">{description}</Typography>
        </>
      }
    />

    <ListItemSecondaryAction>
      <Link target="_blank" href={link}>
        <LinkRoundedIcon />
      </Link>
    </ListItemSecondaryAction>
  </>
);

export default SuggestionItem;
