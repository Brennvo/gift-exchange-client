import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth } from "../context/Auth.context";
import { Link, makeStyles, Tabs, Tab, Menu, MenuItem } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  toolBar: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1200px",
    width: "100%",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  bar: {
    boxShadow: "none",
    width: "100%"
  },
  title: {
    color: "white",
    flexGrow: 1,
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = e => {
    setAnchorEl(e.currentTarget);
    setIsOpen(true);
  };
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <Link className={classes.title} to="/" component={RouterLink}>
            <Typography variant="h6">The North Poll</Typography>
          </Link>
          <Button
            style={{ color: "white", paddingRight: "0" }}
            onClick={openMenu}
          >
            {user.username}
          </Button>
          {isAuthenticated ? (
            <Menu
              anchorEl={anchorEl}
              onClose={closeMenu}
              open={isOpen}
              keepMounted
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          ) : (
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
