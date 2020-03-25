import React, { useReducer, useContext } from "react";
import groupReducer from "../reducers/groups.reducer";
import useErrorIntercept from "../util/errorRedirect";

const UserGroupsStateContext = React.createContext();
const UserGroupsDispatchContext = React.createContext();

const UserGroupsProvider = ({ children }) => {
  useErrorIntercept();
  const [state, dispatch] = useReducer(groupReducer, {
    managedGroups: [],
    participantGroups: [],
    newGroupId: null,
    isLoading: true,
    isError: false
  });

  return (
    <UserGroupsStateContext.Provider value={state}>
      <UserGroupsDispatchContext.Provider value={dispatch}>
        {children}
      </UserGroupsDispatchContext.Provider>
    </UserGroupsStateContext.Provider>
  );
};

const useUserGroups = () => {
  const context = useContext(UserGroupsStateContext);
  return context;
};

const useUserGroupsDispatch = () => {
  const context = useContext(UserGroupsDispatchContext);
  return context;
};

export {
  useUserGroups,
  useUserGroupsDispatch,
  UserGroupsProvider,
  UserGroupsStateContext,
  UserGroupsDispatchContext
};
