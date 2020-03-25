import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Group from "./Group";
import { GroupProvider } from "../../context/Group.context";
import JoinGroup from "./JoinGroup";
import CreateGroup from "./CreateGroup";
import PrivateRoute from "../../components/ProtectedRoute";

export default () => {
  return (
    <BrowserRouter>
      <GroupProvider>
        <Switch>
          <GroupProvider>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>

            <PrivateRoute exact path="/group/create">
              <CreateGroup />
            </PrivateRoute>

            <PrivateRoute exact strict path="/group/:id">
              <Group />
            </PrivateRoute>

            <PrivateRoute exact path="/group/:id/poll/:id">
              <h1>Poll Page coming soon!</h1>
            </PrivateRoute>

            <PrivateRoute exact path="/group/:id/join/:accessToken">
              <JoinGroup />
            </PrivateRoute>
          </GroupProvider>
        </Switch>
      </GroupProvider>
    </BrowserRouter>
  );
};
