import React, { useReducer, useContext } from "react";
import groupReducer from "../reducers/group.reducer";
import useErrorIntercept from "../util/errorRedirect";
const GroupStateContext = React.createContext();
const GroupDispatchContext = React.createContext();

const GroupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(groupReducer, {
    isLoading: true
  });

  return (
    <GroupStateContext.Provider value={state}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupStateContext.Provider>
  );
};

const useGroup = () => {
  const context = useContext(GroupStateContext);
  return context;
};

const useGroupDispatch = () => {
  const context = useContext(GroupDispatchContext);
  return context;
};

export {
  useGroup,
  useGroupDispatch,
  GroupProvider,
  GroupStateContext,
  GroupDispatchContext
};
