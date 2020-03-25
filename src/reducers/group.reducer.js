export default (state, action) => {
  switch (action.type) {
    case "INITIALIZE_GROUP": {
      return {
        ...state,
        isLoading: false,
        id: action.data.id,
        ownerId: action.data.ownerId,
        isPollingOpen: action.isPollingOpen,
        name: action.data.groupName,
        date: action.data.voteEndDt,
        participants: action.data.userPolls,
        invitations: action.data.invitations.map(
          invitiation => invitiation.email
        ),
        selectedParticipant: null
      };
    }
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
    case "SELECT_PARTICIPANT": {
      return {
        ...state,
        selectedParticipant: action.participant
      };
    }
    default:
      return { ...state };
  }
};
