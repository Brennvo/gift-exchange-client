export default (state, action) => {
  switch (action.type) {
    case "SET_GROUPS": {
      return {
        ...state,
        isLoading: false,
        groups: action.groups,
        managedGroups: action.managedGroups,
        participantGroups: action.participantGroups
      };
    }
    case "ERROR": {
      return {
        ...state,
        isError: true
      };
    }
    case "ADD_GROUP": {
      return {
        ...state,
        [action.isUserGenerated
          ? "managedGroups"
          : "participantGroups"]: action.group
      };
    }
    default: {
      return { ...state };
    }
  }
};
