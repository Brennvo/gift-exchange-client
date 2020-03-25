import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";

const MyList = ({ items, children }) => (
  <List>
    {items.map((item, index) => (
      <React.Fragment key={item.id ? item.id : index}>
        <ListItem>{children(item)}</ListItem>
        <Divider component="li" />
      </React.Fragment>
    ))}
  </List>
);

export default MyList;
