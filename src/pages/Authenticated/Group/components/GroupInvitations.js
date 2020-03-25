import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Grid } from "@material-ui/core";

import ModalContent from "../../../../components/ModalContent";
import InvitationForm from "./InvitationForm";
import HeaderBtn from "../../../../components/HeaderBtn";
import InvitationList from "./InvitationList";
import { useGroup, useGroupDispatch } from "../../../../context/Group.context";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const GroupInvitations = () => {
  const group = useGroup();
  const dispatch = useGroupDispatch();
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const inviteParticipant = async email => {
    setIsSending(true);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/group/${group.id}/invite`,
        {
          email
        }
      );
      dispatch({ type: "NEW_INVITATION", email });
      setEmail("");
      setIsOpen(false);
    } catch (e) {
      setIsError(true);
      dispatch({ type: "INVITE_ERROR" });
    }
    setIsSending(false);
  };

  const revokeInvitation = async email => {
    const { invitations: prevInviations } = group;
    dispatch({ type: "REVOKE_INVITATION", email });

    // TODO: trigger modal to confirm cancelation
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/group/${group.id}/revokeInvitation`,
        {
          email
        }
      );
    } catch (e) {
      dispatch({ type: "RESET_INVITIATIONS", prevInviations });
    }
  };

  const onModalClose = () => {
    setEmail("");
    setIsOpen(false);
  };

  return (
    <>
      <HeaderBtn
        text="Invitations"
        showBtn
        handleBtnClick={() => setIsOpen(true)}
        variant="h2"
      />
      <InvitationList
        invitations={group.invitations}
        onRevoke={revokeInvitation}
      />
      <Modal open={isOpen} onClose={onModalClose}>
        <ModalContent>
          {isSending ? (
            <LoadingSpinner />
          ) : isError ? (
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p>Sorry, please try again.</p>
              </Grid>

              <Grid item>
                <Button variant="contained" onClick={() => setIsError(false)}>
                  Go Back
                </Button>
              </Grid>
            </Grid>
          ) : (
            <InvitationForm
              onInvite={inviteParticipant}
              email={email}
              onChange={setEmail}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupInvitations;
