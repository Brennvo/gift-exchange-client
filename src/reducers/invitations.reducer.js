export default (state, action) => {
  switch (action.type) {
    case "NEW_INVITATION": {
      return {
        ...state,
        inviteError: false,
        invitations: [...state.invitations, action.email]
      };
    }
    case "REVOKE_INVITATION": {
      return {
        ...state,
        inviteError: false,
        invitations: state.invitations.filter(email => email !== action.email)
      };
    }
    case "RESET_INVITIATIONS": {
      return {
        ...state,
        inviteError: true,
        invitations: action.prevInviations
      };
    }
    case "INVITE_ERROR": {
      return {
        ...state,
        inviteError: true
      };
    }
  }
};
