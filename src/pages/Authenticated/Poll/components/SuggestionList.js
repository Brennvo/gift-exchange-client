import React from "react";
import List from "../../../../components/List";
import SuggestionItem from "./SuggestionItem";

const SuggestionList = ({ suggestions, pollOwner, onVote }) => {
  return (
    <>
      {suggestions.length === 0 && (
        <p>Be the first to suggest a gift for {pollOwner}!</p>
      )}
      <List items={suggestions}>
        {suggestion => (
          <SuggestionItem suggestion={suggestion} onVote={onVote} />
        )}
      </List>
    </>
  );
};

export default SuggestionList;
