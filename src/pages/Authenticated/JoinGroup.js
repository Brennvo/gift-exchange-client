import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useUserGroupsDispatch } from "../../context/UserGroups.context";

/**
 * Component for joining a group. Will redirect to the group once joined
 */
const JoinGroup = () => {
  // Grab token from URL
  const params = useParams();
  const history = useHistory();
  const dispatch = useUserGroupsDispatch();
  const [isJoining, setIsJoining] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/group/${params.groupId}/poll/${params.accessToken}`
      )
      .then(({ data }) => {
        dispatch({
          type: "ADD_GROUP",
          isUserGenerated: false,
          group: data
        });
        setIsJoining(false);
      })
      .catch(err => {
        if (err.response.status === 409) {
          history.push(`/group/${params.groupId}`);
        }
      });
  }, [params.accessToken, params.groupId]);

  if (isJoining) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Sorry, there was an error joining the group.</div>;
  }

  return <Redirect to={`/group/${params.groupId}`} />;
};

export default JoinGroup;
