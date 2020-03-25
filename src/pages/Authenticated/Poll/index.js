import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import pollReducer from "../../../reducers/poll.reducer";
import ModalContent from "../../../components/ModalContent";
import HeaderBtn from "../../../components/HeaderBtn";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SuggestionList from "./components/SuggestionList";
import SuggestionForm from "./components/SuggestionForm";

const Participant = () => {
  const { groupId, pollId } = useParams();
  const [poll, dispatch] = useReducer(pollReducer, {
    isLoading: true,
    newSuggestion: {
      id: null,
      title: "",
      descript: "",
      link: "",
      votes: 0
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group/${groupId}/poll/${pollId}`)
      .then(({ data }) => {
        dispatch({ type: "SET_POLL", data });
      });
  }, []);

  const createSuggestion = async e => {
    e.preventDefault();
    const { title, description, link } = poll.newSuggestion;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/group/${groupId}/poll/${pollId}`,
        {
          title,
          description,
          link
        }
      );

      dispatch({ type: "NEW_SUGGESTION", newSuggestion: data });
      setIsOpen(false);
    } catch (e) {
      setIsOpen(false);
    }
  };

  const handleSuggestionChange = e => {
    dispatch({
      type: "SET_SUGGESTION",
      newSuggestion: {
        ...poll.newSuggestion,
        [e.target.name]: e.target.value
      }
    });
  };

  const onVote = async id => {
    // Optimistic
    const prevSuggestion = poll.suggestions.find(
      suggestion => suggestion.id === id
    );
    dispatch({
      type: "VOTE_SUGGESTION",
      id
    });

    try {
      //await mockError(1000);

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/group/${groupId}/poll/${pollId}`,
        {
          id,
          upvote: true
        }
      );
    } catch (e) {
      // TODO: alert user error has ocurred on vote
      dispatch({
        type: "REVERT_SUGGESTION",
        prevSuggestion
      });
    }
  };

  if (poll.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <HeaderBtn
        text={`${poll.participant}'s Suggestions`}
        showBtn
        variant="h1"
        handleBtnClick={() => setIsOpen(true)}
      />

      <section>
        <SuggestionList
          suggestions={poll.suggestions}
          onVote={onVote}
          pollOwner={poll.participant}
        />
      </section>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <SuggestionForm
            title={poll.newSuggestion.title}
            description={poll.newSuggestion.descripttion}
            link={poll.newSuggestion.link}
            onChange={handleSuggestionChange}
            onSubmit={createSuggestion}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Participant;
