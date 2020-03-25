import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../../../context/Auth.context";
import LoadingSpinner from "../../../components/LoadingSpinner";
import isFutureDate from "../../../util/isFutureDate";
import { useGroup, useGroupDispatch } from "../../../context/Group.context";
import GroupInvitations from "./components/GroupInvitations";
import GroupPolls from "./components/GroupPolls";
import GroupAlert from "./components/GroupAlert";

const Group = () => {
  const params = useParams();
  const { user } = useAuth();
  const group = useGroup();
  const dispatch = useGroupDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group/${params.id}`)
      .then(({ data }) => {
        dispatch({
          type: "INITIALIZE_GROUP",
          data,
          isPollingOpen: isFutureDate(data.voteEndDt)
        });
      });
  }, [params.id]);

  if (group.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1>{group.name}</h1>

      <section>
        <GroupAlert isPollingOpen={group.isPollingOpen} date={group.date} />
      </section>

      <section>
        <GroupPolls />
      </section>

      {group.ownerId === user.id && group.isPollingOpen && (
        <section>
          <GroupInvitations />
        </section>
      )}

      <RouterLink to="/">Back</RouterLink>
    </>
  );
};

export default Group;
