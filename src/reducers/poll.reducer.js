export default (state, action) => {
  switch (action.type) {
    case "SET_POLL": {
      return {
        ...state,
        isLoading: false,
        groupName: action.data.group.groupName,
        participant: action.data.user.username,
        suggestions: action.data.suggestions
      };
    }
    case "SET_SUGGESTION": {
      return {
        ...state,
        newSuggestion: action.newSuggestion
      };
    }
    case "NEW_SUGGESTION": {
      const { id, title, description, link, votes } = action.newSuggestion;
      const newSuggestion = { id, title, description, link, votes };
      return {
        ...state,
        newSuggestion: {
          title: "",
          description: "",
          link: ""
        },
        suggestions: [...state.suggestions, newSuggestion]
      };
    }
    case "VOTE_SUGGESTION": {
      return {
        ...state,
        suggestions: state.suggestions.map(suggestion =>
          suggestion.id === action.id
            ? { ...suggestion, votes: suggestion.votes + 1 }
            : suggestion
        )
      };
    }
    case "REVERT_SUGGESTION": {
      return {
        ...state,
        suggestions: state.suggestions.map(suggestion =>
          suggestion.id === action.prevSuggestion.id
            ? action.prevSuggestion
            : suggestion
        )
      };
    }
    default: {
      return { ...state };
    }
  }
};
