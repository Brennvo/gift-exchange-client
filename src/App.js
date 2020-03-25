import React, { useEffect } from "react";
import { useAuth } from "./context/Auth.context";
import { Switch, Route, useLocation } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";

import CreateGroup from "./pages/Authenticated/CreateGroup";
import Group from "./pages/Authenticated/Group";
import { UserGroupsProvider } from "./context/UserGroups.context";
import Home from "./pages/Authenticated/Home";
import JoinGroup from "./pages/Authenticated/JoinGroup";
import Landing from "./pages/Guest/Landing";
import Login from "./pages/Guest/Login";
import NotFound from "./pages/NotFound";
import Poll from "./pages/Authenticated/Poll";
import PrivateRoute from "./components/ProtectedRoute";
import LayoutWrapper from "./layouts/LayoutWrapper";
import { GroupProvider } from "./context/Group.context";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Switch>
          {!isAuthenticated && <Route exact path="/" component={Landing} />}
          <Route exact path="/login" component={Login} />
          <Route exact path="/not-found" component={NotFound} />

          <PrivateRoute path="/">
            <UserGroupsProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/group/create" component={CreateGroup} />

                <GroupProvider>
                  <Route exact path="/group/:id" component={Group} />
                  <Route
                    exact
                    path="/group/:groupId/poll/:pollId"
                    component={Poll}
                  />
                  <Route
                    exact
                    path="/group/:groupId/join/:accessToken"
                    component={JoinGroup}
                  />
                </GroupProvider>
              </Switch>
            </UserGroupsProvider>
          </PrivateRoute>
        </Switch>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
